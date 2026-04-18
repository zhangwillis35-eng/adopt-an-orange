import { Inter, Noto_Sans_SC } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
})
