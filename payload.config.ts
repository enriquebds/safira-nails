import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Media } from './src/collections/Media';
import { Services } from './src/collections/Services';
import { GalleryImages } from './src/collections/GalleryImages';
import { Products } from './src/collections/Products';
import { Orders } from './src/collections/Orders';
import { SiteSettings } from './src/globals/SiteSettings';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Safira Nails Admin',
    },
  },
  collections: [Media, Services, GalleryImages, Products, Orders],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: './src/payload-types.ts',
  },
  upload: {
    limits: {
      fileSize: 5_000_000,
    },
  },
});
