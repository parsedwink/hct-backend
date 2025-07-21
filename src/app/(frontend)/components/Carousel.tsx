import { getPayload } from 'payload'
import config from '@payload-config'
import { GalleryItem } from './Carousel_blocks'
import { Imgprod } from '@/payload-types'

export default async function Carousel() {
  const payload = await getPayload({ config })
  const promoProducts = await payload.find({
    collection: 'produse',
    pagination: false,
    depth: 2,
    where: {
      promo: { equals: true },
    },
  })

  const carouselProducts: GalleryItem[] = promoProducts.docs.map((p) => {
    const img = p.imagini![0].value as Imgprod

    return {
      id: p.id.toString(),
      title: p.nume,
      summary: p.descriere!,
      url: p.url_producator!,
      image: img.url!,
    }
  })

  return <div></div>
}
