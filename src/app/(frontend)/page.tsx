// import { getPayload } from 'payload'
import { randParagraph } from '@ngneat/falso'

// import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })

  const someText = randParagraph({ length: 30 })

  return (
    <div className="flex flex-row items-center m-2 min-h-screen">
      <p>text</p>
      {someText}
    </div>
  )
}
