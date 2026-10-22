/**
 * Fill the Studio document (created by create-studio.mjs, still in its
 * Migration Release) with its title, subtitle and description.
 *
 *   node --env-file=.env.local scripts/prismic/update-studio-content.mjs [--dry-run]
 *
 * The Migration API replaces the whole document, so every field is sent.
 */
import * as prismic from '@prismicio/client';
import config from '../../prismic.config.json' with { type: 'json' };

const STUDIO_ID = 'atoO4BEAACgARIcu';

const dryRun = process.argv.includes('--dry-run');
const writeToken = process.env.PRISMIC_WRITE_TOKEN;

if (!writeToken) {
  console.error('Missing PRISMIC_WRITE_TOKEN (put it in .env.local and run with --env-file=.env.local)');
  process.exit(1);
}

const paragraph = (text) => ({ type: 'paragraph', text, spans: [] });

const studio = {
  id: STUDIO_ID,
  type: 'studio',
  lang: 'en-us',
  uid: null,
  tags: [],
  data: {
    hero_image: {},
    page_title: [{ type: 'heading2', text: 'RESONICA STUDIO', spans: [] }],
    subtitle: [{ type: 'heading3', text: 'CRAFTING SOUND, ELEVATING BRANDS', spans: [] }],
    studio_description: [
      paragraph(
        'RESONICA STUDIO is a Swiss-based collective of skilled artists and technologists committed to deliver high-quality work in Advertising, TV & Physical experience. We bring together industry experts and emerging talents, all driven by a shared dedication to creativity, craftsmanship, and innovation. Immersed in a culture of creative ambition, we collaborate with leading global brands such as IWC, YSL, Zalando, JPG, and Asics.'
      ),
      paragraph(
        'Our dedication to disruption and collaborative approach enable us to deliver innovative and thought-provoking creative solutions for your brand.'
      ),
    ],
    studio_socials: [],
    studio_links: [],
    slices: [],
    meta_title: 'Resonica Studio',
    meta_description: 'Crafting sound, elevating brands.',
    meta_image: {},
  },
};

console.log(JSON.stringify(studio.data, null, 2));

if (dryRun) {
  console.log('Dry run – nothing sent.');
  process.exit(0);
}

const writeClient = prismic.createWriteClient(config.repositoryName, { writeToken });
const migration = prismic.createMigration();
migration.updateDocument(studio, 'Studio');
await writeClient.migrate(migration, {
  reporter: (event) => {
    if (event.type === 'end') console.log('Migration done:', JSON.stringify(event.data));
  },
});
