import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title:{
    default:"Flow Jobs",
    template: "%s || flowjobs"
  },
  description: 'Find Your Dream Developer Job',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[375px]`}>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
