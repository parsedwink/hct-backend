import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'

import Image from 'next/image'
import logo from 'src/assets/hct-logo.svg'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return (
    <div className="">
      <Image src={logo} alt="HCT Logo" />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>Home</p>
    </div>
  )
}
