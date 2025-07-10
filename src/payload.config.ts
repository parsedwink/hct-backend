// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Parteneri } from './collections/Parteneri'
import { Produse } from './collections/Produse'
import { ImaginiProduse } from './collections/ImaginiProduse'
import { Categorii } from './collections/Categorii'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Parteneri, Produse, Categorii, ImaginiProduse],
  editor: lexicalEditor(),
  cors: '*',
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: 'info@payloadcms.com',
    defaultFromName: 'Payload',
    // Nodemailer transportOptions
    transportOptions: {
      host: 'localhost',
      port: '1025',
      auth: false,
    },
  }),
  i18n: {
    supportedLanguages: { en, ro },
  },
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  bin: [
    {
      scriptPath: path.resolve(dirname, 'scripts/seed.ts'),
      key: 'seed',
    },
    {
      scriptPath: path.resolve(dirname, 'scripts/clean.ts'),
      key: 'clean',
    },
  ],
})
