import SupabaseProvider from './supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { PropsWithChildren } from 'react';
import 'styles/main.css';

import Link from 'next/link';

const meta = {
  title: 'gecover - Automated, Tailored Cover Letters',
  description: 'Brought to you by GeCover LLC.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://gecover.vercel.app',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vercel',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-black loading">
        <SupabaseProvider>
          
          {/* @ts-expect-error */}
          <Navbar />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>    
          <footer className="flex flex-row justify-center bg-gray-800 text-white p-4 text-center">
              <Link
                href="/contact"
                className="m-2"
              >
                Contacts
              </Link>
              <p className="font-bold m-2">&copy; {new Date().getFullYear()} GeCover. All rights reserved.</p>
              <a className="m-2" href="https://www.termsfeed.com/live/15cd706e-a80f-4ad0-a1cc-34f68716ad27"> Privacy Policy</a>
          </footer>
        </SupabaseProvider>
      </body>
    </html>
  );
}
