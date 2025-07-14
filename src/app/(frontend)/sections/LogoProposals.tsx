import Image from 'next/image'
import v1 from 'src/assets/v1.svg'
import v2 from 'src/assets/v2.svg'
import v3 from 'src/assets/v3.svg'

export default async function LogoProposal() {
  return (
    <div className="flex items-center gap-2 w-full p-4 bg-gray-100 rounded-2xl">
      <Image src={v1} alt="versiunea 1" priority />
      <div className="grow"></div>
      <Image src={v2} alt="versiunea 2" priority />
      <div className="grow"></div>
      <Image src={v3} alt="versiunea 3" priority />
    </div>
  )
}
