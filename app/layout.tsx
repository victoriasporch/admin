import type { Metadata } from 'next';
import { Outfit, Libre_Baskerville } from 'next/font/google';
import './globals.css';
import Radix from './providers/Radix';
import ConnectDb from './providers/ConnectDb';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const libre = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Victoria's Porch Admin",
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${libre.variable} antialiased`}>
        <ConnectDb>
          <Toaster position="top-right" />
          <NextTopLoader color="#7a3c8f" />
          <Radix>{children}</Radix>
        </ConnectDb>
      </body>
    </html>
  );
}
