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
    { name: 'descriere', type: 'textarea', admin: { rows: 4 } },
    {
      name: 'promo',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Promovat in liste produse' },
    },
    { name: 'pagina', type: 'text', admin: { description: 'link catre pagina dedicata din site' } },
    { name: 'partener', type: 'relationship', relationTo: 'parteneri' },
    { name: 'categorie', type: 'relationship', relationTo: 'categorii' },
    { name: 'materiale', type: 'select', options: materiale, hasMany: true, index: true },
    { name: 'imagini', type: 'relationship', relationTo: ['imgprod'], hasMany: true },
    { name: 'url_producator', type: 'text' },
    {
      type: 'collapsible',
      label: 'Import data',
      fields: [
        { name: 'import_img_name', type: 'text' },
        { name: 'import_cod_partener', type: 'text' },
        {
          name: 'import_categorie',
          type: 'text',
          admin: { description: 'Categoria din pagina producator' },
        },
        {
          name: 'import_descriere_en',
          type: 'text',
          admin: { description: 'Traducere en descriere cu AI' },
        },
      ],
    },
  ],
  admin: { useAsTitle: 'nume' },
}
