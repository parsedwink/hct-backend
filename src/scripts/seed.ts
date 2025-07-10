import { existsSync, promises as fs } from 'fs'

import type { Parteneri } from '@/payload-types'
import type { SanitizedConfig } from 'payload'
import payload from 'payload'

const BASE = 'dummy/'
const PLACEHOLDER = `${BASE}image_placeholder.png`

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
    let imageFilePath = `${BASE}partner_logos/logo_${id}.png`
    if (!existsSync(imageFilePath)) {
      imageFilePath = PLACEHOLDER
    }
    const { id: uploadedImage } = await payload.create({
      collection: 'media',
      data: { alt: `Logo ${name}` },
      filePath: imageFilePath,
    })
    // partener
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
    // lookup for produs
    created_partneri.set(id, created)
    payload.logger.info(`created partner: ${id}`)
  })
  await Promise.all(result)
  payload.logger.info('done: Parteneri')

  // produse
  // imgprod_placeholder
  await payload.create({
    collection: 'imgprod',
    filePath: PLACEHOLDER,
    data: { alt: 'Image Placeholder' },
  })
  result = imp_prodse.map(async (p) => {
    const { name, code, url, imp_categ, img_name, desc } = p

    // imagine produs
    let imageOK = true
    const imageFilePath = `${BASE}imagini_produse/${img_name}`

    // check if image exists
    if (img_name.length > 0) {
      if (!existsSync(imageFilePath)) {
        imageOK = false
        payload.logger.warn(`code ${code}, name ${name}, image not found: ${img_name}`)
      }
    } else {
      imageOK = false
      payload.logger.warn(`code ${code}, name ${name}, has no image`)
    }

    // get partener from code
    const partener = created_partneri.get(code)

    if (imageOK) {
      // create produs with image
      const { id: uploadedImage } = await payload.create({
        collection: 'imgprod',
        data: { alt: `${code} ${name}` },
        filePath: imageFilePath,
      })
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
    } else {
      // create produs without image
      await payload.create({
        collection: 'produse',
        data: {
          nume: name,
          descriere: desc,
          partener: partener,
          imagini: [],
          url_producator: url,
          import_img_name: img_name,
          import_cod_partener: code,
          import_categorie: imp_categ,
        },
      })
    }
    payload.logger.info(`created produs: ${name}`)
  })
  await Promise.all(result)
  payload.logger.info('done: Produse')

  payload.logger.info('Successfully seeded!')
}
