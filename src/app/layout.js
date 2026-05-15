import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Camera-Wale | Compare. Decide. Shoot.",
  description: "Find the perfect gear. Compare specs head-to-head and secure the lowest local prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-gray-50 text-slate-800 antialiased overflow-x-hidden`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
