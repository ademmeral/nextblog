import { Inter } from 'next/font/google';
import Head from './head';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import CurrentUserProvider from '@/contexts/AuthProvider';
import ThemeProvider from '@/contexts/ThemeContext';
import './globals.css';
import Aside from '@/components/Aside/Aside';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <Head />
      <body>
        <ThemeProvider>
          <CurrentUserProvider>
            <Navbar />
            <main className='main wrapper flex gap-8'>
              <div className='scrolled no-scrollbar flex-[3] flex gap-8'>
                {children}
              </div>
              <Aside />
            </main>
            <Footer />
          </CurrentUserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
