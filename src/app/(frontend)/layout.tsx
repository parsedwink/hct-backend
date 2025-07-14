import React from 'react'
import './styles.css'

import { Outfit } from 'next/font/google'
import Header from './sections/Header'
import Footer from './sections/Footer'

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
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml"></link>
      </head>
      <body>
        <div className="mx-auto container">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
