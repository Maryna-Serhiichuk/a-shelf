import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { App } from "@/components/App";
import { Layout } from "@/components/Layout";
import { Progress } from "@/components/Progress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A-Shelf",
  description: "Cosmetica offers high-quality skincare and cosmetics made with clean ingredients. Discover beauty products that care for your skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Progress />
        <App>
          <Layout>
            {children}
          </Layout>
        </App>
      </body>
    </html>
  );
}
