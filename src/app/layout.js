import './globals.css'
import { Inter } from 'next/font/google'
import Header from './layouts/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FINANC.IA - Performance em análise de clientes',
  description: 'Criado por - Vitor Hugo de Souza',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: 'flex' }}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
