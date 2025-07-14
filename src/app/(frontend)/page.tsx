// import { getPayload } from 'payload'

// import config from '@/payload.config'
import './styles.css'

import LogoProposal from './sections/LogoProposals'

export default async function HomePage() {
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })

  return (
    <div className="flex flex-row items-center m-2">
      <div className="w-xl h-2xl">Propuneri logo</div>
      <LogoProposal />
    </div>
  )
}
