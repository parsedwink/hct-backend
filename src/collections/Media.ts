import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'public/media',
    displayPreview: true,
    adminThumbnail: 'small',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'small',
        fit: 'cover',
        height: 200,
        width: 200,
      },
      {
        name: 'large',
        fit: 'cover',
        height: 600,
        width: 600,
      },
    ],
  },
}
