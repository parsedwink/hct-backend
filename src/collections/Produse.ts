import type { CollectionConfig } from 'payload'

const materiale = ['aluminiu', 'metale', 'hârtie', 'lemn', 'plastic', 'neferoase', 'menajere']

export const Produse: CollectionConfig = {
  slug: 'produse',
  labels: {
    singular: 'Produs',
    plural: 'Produse',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'nume', type: 'text', required: true },
    { name: 'descriere', type: 'textarea' },
    { name: 'partener', type: 'relationship', relationTo: 'parteneri' },
    { name: 'categorie', type: 'relationship', relationTo: 'categorii' },
    { name: 'materiale', type: 'select', options: materiale, hasMany: true, index: true },
    { name: 'imagini', type: 'relationship', relationTo: ['imgprod'], hasMany: true },
    { name: 'url_producator', type: 'text' },
    { name: 'import_img_name', type: 'text' },
    { name: 'import_cod_partener', type: 'text' },
    { name: 'import_categorie', type: 'text' },
  ],
  admin: { useAsTitle: 'nume' },
}
