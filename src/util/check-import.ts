import { existsSync, promises as fs } from 'fs'

const BASE = 'import/'
const PLACEHOLDER = `${BASE}image_placeholder.png`

async function readFile(fileName: string): Promise<string> {
  const content = await fs.readFile(BASE + fileName, 'utf8')
  return content
}

/** main script */
export const script = async () => {
  const imp_prodse = JSON.parse(await readFile('prods.json')) as {
    name: string
    code: string
    url: string
    imp_categ: string
    img_name: string
    desc: string
  }[]

  console.log(`prods: ${imp_prodse.length}`)
}

await script()
