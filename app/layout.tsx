import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trend Aggregator",
  description: "Aggregate and analyze social media trends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex space-x-6">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/search" className="hover:text-gray-300">Search</Link>
            <Link href="/analyze" className="hover:text-gray-300">Analyze</Link>
            <Link href="/trends" className="hover:text-gray-300">Trends</Link>
            <Link href="/stats" className="hover:text-gray-300">Stats</Link>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
