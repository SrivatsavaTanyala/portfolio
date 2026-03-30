import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Tanyala Srivatsava | Portfolio',
  description: 'Personal portfolio showcasing my skills and projects',
  icons: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${montserrat.variable} font-sans antialiased overflow-x-hidden w-full`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
