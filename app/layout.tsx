import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./providers/SessionProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'AI Recipe Generator - Demo Project',
  description: 'An experimental AI-powered recipe generator using free models. Enter ingredients and get creative recipe suggestions. Note: Results are for demonstration purposes.',
  keywords: ['AI', 'recipe generator', 'demo project', 'experimental', 'Next.js', 'React'],
  authors: [{ name: 'Chef Mistral Team' }],
  creator: 'Chef Mistral',
  icons: {
    icon: '/chefhat.png',
    shortcut: '/chefhat.png',
    apple: '/chefhat.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'AI Recipe Generator - Demo Project',
    description: 'An experimental AI-powered recipe generator using free models. Enter ingredients and get creative recipe suggestions.',
    siteName: 'Chef Mistral',
    images: [{
      url: '/chefhat.png',
      width: 800,
      height: 600,
      alt: 'Chef Mistral Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Mistral - Your AI-Powered Recipe Assistant',
    description: "Transform your ingredients into delicious recipes with Chef Mistral.",
    images: ['/chefhat.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/chefhat.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        <Navbar/>
        <AuthProvider>{children}</AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}
