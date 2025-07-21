// import { getPayload } from 'payload'
// import { randParagraph } from '@ngneat/falso'

// import config from '@/payload.config'
import MyTablePage from './components/DataTable'
import './styles.css'

export default async function HomePage() {
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })

  // const someText = randParagraph({ length: 10 })

  return (
    <div className="">
      <p>content</p>
      <MyTablePage />
    </div>
  )
}
