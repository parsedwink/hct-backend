import Link from 'next/link'
import { NavbarDemo } from './Navbar'

export default async function Header() {
  return (
    <div>
      <nav>
        <Link href="/">home</Link>&nbsp;
        <Link href="/en">en</Link>&nbsp;
        <Link href="/de">de</Link>&nbsp;
        <Link href="/it">it</Link>&nbsp;
      </nav>
      <NavbarDemo />
    </div>
  )
}
