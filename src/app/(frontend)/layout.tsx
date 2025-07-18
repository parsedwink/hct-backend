import React from 'react'
import './styles.css'

import { Outfit } from 'next/font/google'
import Header from './sections/Header'
import Footer from './sections/Footer'
import { ThemeProvider } from '@/components/theme-provider'

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
})

export const metadata = {
  description:
    'Soluții la cheie pentru reciclare fier vechi, aluminiu, DEEE-uri, VSU-uri, deșeuri din industria hârtiei.',
  title: 'Hațegan Consulting & Trading',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml"></link>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto container">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
