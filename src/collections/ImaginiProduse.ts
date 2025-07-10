import type { CollectionConfig } from 'payload'

export const ImaginiProduse: CollectionConfig = {
  slug: 'imgprod',
  labels: {
    singular: 'Imagine Produs',
    plural: 'Imagini Produse',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'alt', type: 'text', required: false },
    { name: 'partener', type: 'relationship', relationTo: 'parteneri', required: false },
  ],
  upload: true,
}
