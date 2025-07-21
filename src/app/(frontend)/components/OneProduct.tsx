import { getPayload } from 'payload'
import config from '@payload-config'
import { Textarea } from '@/components/ui/textarea'

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

  const demo = JSON.stringify(promoProducts.docs[0], null, 2)
  return (
    <div>
      <Textarea defaultValue={demo}></Textarea>
    </div>
  )
}
