/**
 * Push the local `date` and `release` custom types to Prismic via the
 * Custom Types API (the same call Slice Machine's "Push" makes).
 *
 *   node --env-file=.env.local scripts/prismic/push-types.mjs [--dry-run]
 *
 * Needs PRISMIC_WRITE_TOKEN (Prismic → Settings → API & Security → Write APIs).
 * Prints the field-level difference between remote and local before pushing.
 */
import fs from 'node:fs';
import path from 'node:path';
import sm from '../../slicemachine.config.json' with { type: 'json' };

const TYPES = ['date', 'release'];
const API = 'https://customtypes.prismic.io';
const dryRun = process.argv.includes('--dry-run');
const token = process.env.PRISMIC_WRITE_TOKEN;

if (!token) {
  console.error('Missing PRISMIC_WRITE_TOKEN (put it in .env.local and run with --env-file=.env.local)');
  process.exit(1);
}

const headers = {
  repository: sm.repositoryName,
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

// Order-insensitive comparison: the API returns keys alphabetised.
const canon = (v) =>
  Array.isArray(v)
    ? v.map(canon)
    : v && typeof v === 'object'
      ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])]))
      : v;
const same = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));

const fieldsOf = (model) =>
  Object.fromEntries(
    Object.entries(model.json ?? {}).flatMap(([tab, fields]) =>
      Object.entries(fields).map(([id, def]) => [`${tab}.${id}`, def])
    )
  );

for (const id of TYPES) {
  const local = JSON.parse(
    fs.readFileSync(path.join('customtypes', id, 'index.json'), 'utf8')
  );

  const res = await fetch(`${API}/customtypes/${id}`, { headers });
  if (res.status === 404) {
    console.error(`Remote type "${id}" does not exist – refusing to insert, only updating is supported here.`);
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`GET ${id} failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const remote = await res.json();

  const localFields = fieldsOf(local);
  const remoteFields = fieldsOf(remote);
  const changes = [];
  for (const key of Object.keys(localFields)) {
    if (!(key in remoteFields)) changes.push(`  + ${key} (${localFields[key].type})`);
    else if (!same(localFields[key], remoteFields[key]))
      changes.push(`  ~ ${key} (${localFields[key].type})`);
  }
  for (const key of Object.keys(remoteFields)) {
    if (!(key in localFields)) changes.push(`  - ${key} (${remoteFields[key].type})`);
  }

  console.log(`\n${id}: ${changes.length ? 'changes' : 'no field changes'}`);
  changes.forEach((c) => console.log(c));
  if (!changes.length) continue;
  if (dryRun) continue;

  const push = await fetch(`${API}/customtypes/update`, {
    method: 'POST',
    headers,
    body: JSON.stringify(local),
  });
  if (!push.ok) {
    console.error(`POST update ${id} failed: ${push.status} ${await push.text()}`);
    process.exit(1);
  }
  console.log(`  pushed ${id} (${push.status})`);
}

console.log(dryRun ? '\nDry run – nothing pushed.' : '\nDone.');
