import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Background3D from "@/components/Background3D";
import Web3Providers from "@/components/Web3Providers";
import '@rainbow-me/rainbowkit/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3Job Network - The Future of Work",
  description: "Connect with Web3 opportunities, find your dream job, and join the decentralized workforce",
  keywords: "Web3, blockchain, jobs, careers, crypto, DeFi, NFT, DAO",
  authors: [{ name: "Web3Job Network" }],
  openGraph: {
    title: "Web3Job Network - The Future of Work",
    description: "Connect with Web3 opportunities, find your dream job, and join the decentralized workforce",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Web3Providers>
          <Background3D />
          <Navbar />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
        </Web3Providers>
      </body>
    </html>
  );
}
