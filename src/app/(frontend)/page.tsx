// import { getPayload } from 'payload'
// import { randParagraph } from '@ngneat/falso'

// import config from '@/payload.config'
import { Separator } from '@/components/ui/separator'
import BentoMagic from './components/Bento_magic'
import OneProduct from './components/OneProduct'
import './styles.css'
import Carousel from './components/Carousel'

export default async function HomePage() {
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })

  // const someText = randParagraph({ length: 10 })

  return (
    <div className="">
      <OneProduct />
      <Separator className="my-4" />
      <Carousel />
      <Separator className="my-4" />
      <BentoMagic />
    </div>
  )
}
