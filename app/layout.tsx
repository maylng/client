import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Inbox AI',
  description: 'An email client template using the Next.js App Router.',
  // keywords: "Wengine, business, sales, brands, monetize, advertising, marketing",
  // icons: {
  //   icon: '/icon.svg',
  //   shortcut: '/wengine-apple-icon.png',
  //   apple: '/wengine-apple-icon.png'
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`} suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}