import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { inter, notoSansSC } from "./fonts";
import AuthProvider from "@/components/auth/AuthProvider";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adopt-an-orange.com"),
  title: {
    default: "认养一个橙子 - 认养你的专属橙树",
    template: "%s | 认养一个橙子",
  },
  description:
    "认养一棵橙树，体验从开花到结果的全过程。新鲜直达，品质保证，让每一颗橙子都有专属的温暖。",
  keywords: [
    "认养橙子",
    "认养橙树",
    "脐橙认养",
    "水果认养",
    "农场直供",
    "有机水果",
    "赣南脐橙",
    "C2B认养",
  ],
  openGraph: {
    type: "website",
    siteName: "认养一个橙子",
    title: "认养一个橙子 - 认养你的专属橙树",
    description:
      "认养一棵橙树，体验从开花到结果的全过程。新鲜直达，品质保证。",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "认养一个橙子" }],
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "认养一个橙子 - 认养你的专属橙树",
    description:
      "认养一棵橙树，体验从开花到结果的全过程。新鲜直达，品质保证。",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${notoSansSC.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics - 替换 GA_MEASUREMENT_ID */}
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
