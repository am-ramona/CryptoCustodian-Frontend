import type { Metadata } from 'next'
import Layout from './ui'
import { ibmPlexSans, ibmPlexMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crypto Custodian',
  description:
    'Provides users with the best experience in managing digital assets for their clients',
  icons: {
    icon: '/avatar.png',
    apple: '/avatar.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="relative p-5">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}


