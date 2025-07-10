import { getPayload } from 'payload'
import config from '@payload-config'

import products_data from 'src/scripts/hct-sample-prods-for-strapi.json'

async function run() {
  const payload = await getPayload({ config })

  const partners = await payload.find({
    collection: 'parteneri',
  })

  console.log('Partner count', partners.totalDocs)

  try {
    for (const prod of products_data) {
      await payload.create({
        collection: 'produse',
        data: { import_cod_partener: prod.code },
      })
      console.log(`Created: ${prod.name}`)
    }
  } catch (error) {
    console.error(JSON.stringify(error))
  }

  process.exit(0)
}

await run()
