import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { NavLinks } from '@/app/ui/nav-links';
import './globals.css';

const inter = IBM_Plex_Sans({
  weight: ['700'], // Specify the weight you need for titles (bold)
  subsets: ['latin'],
  display: 'swap',
});

// Create the font config specifying weights and subsets if required
const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'], // Specify desired weights
  style: ['normal', 'italic'],
  subsets: ['latin'], // Specify subsets if needed
  display: 'swap', // Optional: How to display the font
});

export const metadata: Metadata = {
  title: 'Crypto Custodian',
  description:
    'Provides users with the best experience in managing digital assets for their clients',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavLinks />
        <main>{children}</main>
      </body>
    </html>
  );
}
