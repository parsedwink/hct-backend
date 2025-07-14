import React from 'react'
import './styles.css'

import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={outfit.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
