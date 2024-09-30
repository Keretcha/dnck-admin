import type { Metadata } from 'next';
import { NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';
import './globals.css';
import './Styles/ant.table.scss';
import RecoilWrapper from './Components/RecoilWrapper/RecoilWrapper';

const inter: NextFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Admin DNCK',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilWrapper>{children}</RecoilWrapper>
      </body>
    </html>
  );
}
