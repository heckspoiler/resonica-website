/**
 * Create the Studio document and add it to the Settings navigation (index 6,
 * after Contact) via the Migration API. Both land in Prismic → Migration
 * Releases for review and publishing.
 *
 *   node --env-file=.env.local scripts/prismic/create-studio.mjs [--dry-run]
 *
 * Needs PRISMIC_WRITE_TOKEN. Run once: it refuses if a published Studio
 * document or a Studio navigation entry already exists.
 */
import * as prismic from '@prismicio/client';
import config from '../../prismic.config.json' with { type: 'json' };

const dryRun = process.argv.includes('--dry-run');
const writeToken = process.env.PRISMIC_WRITE_TOKEN;

if (!writeToken) {
  console.error('Missing PRISMIC_WRITE_TOKEN (put it in .env.local and run with --env-file=.env.local)');
  process.exit(1);
}

const client = prismic.createClient(config.repositoryName);
const writeClient = prismic.createWriteClient(config.repositoryName, { writeToken });

const existing = await client.getSingle('studio').catch(() => null);
if (existing) {
  console.error('A published Studio document already exists – nothing to do.');
  process.exit(1);
}

const settings = await client.getSingle('settings');
if (settings.data.navigation.some((item) => item.link?.type === 'studio')) {
  console.error('Settings navigation already links to Studio – nothing to do.');
  process.exit(1);
}

const studio = {
  type: 'studio',
  lang: settings.lang,
  data: {
    hero_image: {},
    page_title: [{ type: 'heading2', text: 'Studio', spans: [] }],
    studio_description: [],
    studio_socials: [],
    studio_links: [],
    slices: [],
    meta_title: 'Studio',
    meta_description: '',
    meta_image: {},
  },
};

console.log('Studio document:', JSON.stringify(studio.data, null, 2));
console.log('Navigation today:', settings.data.navigation.map((item) => item.label).join(', '));
console.log('Navigation after:', [...settings.data.navigation.map((item) => item.label), 'Studio'].join(', '));

if (dryRun) {
  console.log('Dry run – nothing sent.');
  process.exit(0);
}

const report = (event) => {
  if (event.type === 'end') console.log('Migration done:', JSON.stringify(event.data));
};

// 1. Create the Studio document so it gets an ID.
const createMigration = prismic.createMigration();
const studioDoc = createMigration.createDocument(studio, 'Studio');
await writeClient.migrate(createMigration, { reporter: report });

const studioId = studioDoc.document.id;
if (!studioId) {
  console.error('Studio document was not created – aborting before touching Settings.');
  process.exit(1);
}
console.log('Studio document ID:', studioId);

// 2. Append the Studio entry to the Settings navigation.
const settingsMigration = prismic.createMigration();
settingsMigration.updateDocument({
  ...settings,
  data: {
    ...settings.data,
    navigation: [
      ...settings.data.navigation,
      {
        link: { link_type: 'Document', id: studioId, text: 'Studio' },
        label: 'Studio',
      },
    ],
  },
});
await writeClient.migrate(settingsMigration, { reporter: report });
