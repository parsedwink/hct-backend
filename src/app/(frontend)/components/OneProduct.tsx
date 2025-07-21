import { getPayload } from 'payload'
import config from '@payload-config'

export default async function OneProduct() {
  const payload = await getPayload({ config })
  const promoProducts = await payload.find({
    collection: 'produse',
    pagination: false,
    depth: 2,
    where: {
      promo: { equals: true },
    },
  })

  const demo = promoProducts.docs[3]
  return (
    <div>
      {/* demo hidden */}
      <h2 className="text-4xl hidden">{demo.nume}</h2>
    </div>
  )
}
