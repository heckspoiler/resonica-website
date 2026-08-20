/**
 * Fill the new fields of every `date` document from its legacy fields:
 *
 *   event_description_rich  ← event_description (plain text → paragraphs)
 *   event_dates[]           ← event_date_start / event_start_date + date_time
 *                             (festivals with an end date get one entry per day)
 *
 * Idempotent: a field that is already filled is left untouched. Every document
 * that needs at least one of the two is re-sent in full, so both fields end up
 * in the migration release together.
 *
 *   node --env-file=.env.local scripts/prismic/migrate-dates.mjs [--dry-run] [--publish]
 *
 * Needs PRISMIC_WRITE_TOKEN; the model must already be pushed.
 */
import * as prismic from '@prismicio/client';
import sm from '../../slicemachine.config.json' with { type: 'json' };

const dryRun = process.argv.includes('--dry-run');
const publish = process.argv.includes('--publish');
const token = process.env.PRISMIC_WRITE_TOKEN;

if (!token) {
  console.error('Missing PRISMIC_WRITE_TOKEN (put it in .env.local and run with --env-file=.env.local)');
  process.exit(1);
}

// The live model must have both target fields.
const modelRes = await fetch('https://customtypes.prismic.io/customtypes/date', {
  headers: { repository: sm.repositoryName, Authorization: `Bearer ${token}` },
});
if (!modelRes.ok) {
  console.error(`Could not read the remote "date" model: ${modelRes.status} ${await modelRes.text()}`);
  process.exit(1);
}
const model = await modelRes.json();
const main = model.json?.Main ?? {};
for (const field of ['event_description_rich', 'event_dates']) {
  if (!main[field]) {
    console.error(`The live "date" model has no "${field}" field yet – push the model first (Slice Machine → Review changes → Push).`);
    process.exit(1);
  }
}
// Fields that still exist in the live model (all tabs). The Migration API
// rejects documents carrying data for fields that were removed from the model.
const modelFields = new Set(
  Object.values(model.json ?? {}).flatMap((tab) => Object.keys(tab))
);

/** "a\nb\n\nc" → [{paragraph "a\nb"}, {paragraph "c"}] */
const textToRichText = (text) =>
  text
    .replace(/\r\n?/g, '\n')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => ({ type: 'paragraph', text: p, spans: [], direction: 'ltr' }));

/** "27.06.2026" → "2026-06-27" */
const parseDisplayDate = (text) => {
  const m = (text ?? '').trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : '';
};

const addDays = (iso, n) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** Legacy single fields → event_dates entries. */
function legacyEventDates(data) {
  const start = data.event_date_start || parseDisplayDate(prismic.asText(data.event_start_date));
  const time = prismic.asText(data.date_time).trim();
  if (!start && !time) return [];

  const end = data.event_date_end || '';
  const isFestival = /festival/i.test(prismic.asText(data.date_type));
  const spanDays =
    start && end && end > start
      ? Math.round((Date.parse(end) - Date.parse(start)) / 86_400_000)
      : 0;

  // Multi-day festivals: one entry per day (same time; to be adjusted by hand).
  if (isFestival && spanDays > 0 && spanDays <= 7) {
    return Array.from({ length: spanDays + 1 }, (_, i) => ({ date: addDays(start, i), time }));
  }
  return [{ date: start || null, time }];
}

const client = prismic.createWriteClient(sm.repositoryName, { writeToken: token });
const dates = await client.getAllByType('date');
const migration = prismic.createMigration();

let queued = 0;
for (const doc of dates) {
  const changes = [];

  const legacy = doc.data.event_description;
  if (typeof legacy === 'string' && legacy.trim() && !prismic.isFilled.richText(doc.data.event_description_rich)) {
    doc.data.event_description_rich = textToRichText(legacy);
    changes.push(`rich text ${doc.data.event_description_rich.length}¶`);
  }

  const hasGroup = Array.isArray(doc.data.event_dates) && doc.data.event_dates.some((d) => d.date || d.time);
  if (!hasGroup) {
    const entries = legacyEventDates(doc.data);
    if (entries.length) {
      doc.data.event_dates = entries;
      changes.push(`dates ${entries.map((e) => `${e.date ?? '?'}${e.time ? ` ${e.time}` : ''}`).join(' | ')}`);
    }
  }

  if (!changes.length) {
    console.log(`skip   ${doc.uid}: nothing to fill`);
    continue;
  }

  // Drop stale data of fields that no longer exist in the model (uid lives on the document itself).
  const stale = Object.keys(doc.data).filter((key) => key !== 'uid' && !modelFields.has(key));
  for (const key of stale) delete doc.data[key];
  if (stale.length) changes.push(`drop ${stale.join(',')}`);

  migration.updateDocument(doc);
  queued++;
  console.log(`queue  ${doc.uid}: ${changes.join(' · ')}`);
}

console.log(`\n${queued} of ${dates.length} date documents to update.`);
if (!queued) process.exit(0);
if (dryRun) {
  console.log('Dry run – nothing sent.');
  process.exit(0);
}

await client.migrate(migration, {
  reporter: (event) => {
    const uid = event.data?.document?.document?.uid ?? event.data?.document?.uid ?? '';
    console.log(`  ${event.type} ${uid}`);
  },
});
console.log('\nUpdates are in the migration release (Prismic → Migration Releases).');

if (publish) {
  await client.publishMigrationRelease();
  console.log('Migration release published.');
} else {
  console.log('Review it there and publish, or re-run with --publish.');
}
