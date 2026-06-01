import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Media } from './src/collections/Media';
import { Services } from './src/collections/Services';
import { GalleryImages } from './src/collections/GalleryImages';
import { Products } from './src/collections/Products';
import { Orders } from './src/collections/Orders';
import { SiteSettings } from './src/globals/SiteSettings';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Safira Nails Admin',
    },
  },
  collections: [Media, Services, GalleryImages, Products, Orders],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
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
