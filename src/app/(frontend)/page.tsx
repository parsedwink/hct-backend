import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'

import Image from 'next/image'
import logo from 'src/assets/hct-logo.svg'
import LogoProposal from './sections/LogoProposals'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return (
    <div className="">
      <LogoProposal />
    </div>
  )
}
