import './globals.css'

import { Inter, Architects_Daughter } from 'next/font/google'

import Header from '../components/ui/header'
import { Toaster } from "react-hot-toast"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased`} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  )
}
