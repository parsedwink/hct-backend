import { promises as fs } from 'fs'

import type { SanitizedConfig } from 'payload'
import payload, { getFileByPath } from 'payload'
import type { Parteneri } from '@/payload-types'

const BASE = 'dummy/'

async function readFile(fileName: string): Promise<string> {
  const content = await fs.readFile(BASE + fileName, 'utf8')
  return content
}

/** main script */
export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  const created_partneri = new Map<string, Parteneri>()
  let result: Promise<void>[]

  // prepare data
  const imp_partners = JSON.parse(await readFile('partners.json')) as {
    id: string
    name: string
    desc: string
    url: string
  }[]
  const imp_prodse = JSON.parse(await readFile('prods.json')) as {
    name: string
    code: string
    url: string
    imp_categ: string
    img_name: string
    desc: string
  }[]
  const categorii_txt = await readFile('categorii.txt')
  const imp_categorii = categorii_txt.split('\n')

  // categorii
  result = imp_categorii.map(async (c) => {
    await payload.create({
      collection: 'categorii',
      data: {
        denumire: c,
      },
    })
  })
  await Promise.all(result)
  payload.logger.info('done: Categorii')

  // parteneri
  result = imp_partners.map(async (p) => {
    const { id, name, desc, url } = p

    // logo partener
    const imageFilePath = `${BASE}partner_logos/logo_${id}.png`
    const { id: uploadedImage } = await payload.create({
      collection: 'media',
      data: { alt: `Logo ${name}` },
      filePath: imageFilePath,
    })
    const created = await payload.create({
      collection: 'parteneri',
      data: {
        cod: id,
        nume: name,
        logo: uploadedImage,
        descriere: desc,
        url: url,
      },
    })
    created_partneri.set(id, created)
    payload.logger.info(`created partner: ${id}`)
  })
  await Promise.all(result)
  payload.logger.info('done: Parteneri')

  // produse
  result = imp_prodse.map(async (p) => {
    const { name, code, url, imp_categ, img_name, desc } = p
    // upload imagine produs
    const imageFilePath = `${BASE}imagini_produse/${img_name}`
    const { id: uploadedImage } = await payload.create({
      collection: 'imgprod',
      data: { alt: `${code} ${name}` },
      filePath: imageFilePath,
    })
    // get partener from code
    const partener = created_partneri.get(code)
    // create produs
    await payload.create({
      collection: 'produse',
      data: {
        nume: name,
        descriere: desc,
        partener: partener,
        imagini: [
          {
            relationTo: 'imgprod',
            value: uploadedImage,
          },
        ],
        url_producator: url,
        import_img_name: img_name,
        import_cod_partener: code,
        import_categorie: imp_categ,
      },
    })
    payload.logger.info(`created produs: ${name}`)
  })
  await Promise.all(result)
  payload.logger.info('done: Produse')

  payload.logger.info('Successfully seeded!')
}
