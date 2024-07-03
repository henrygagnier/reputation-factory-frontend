import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/constants/config";

import { Navbar } from "@/components/navbar/navbar/comp";

const _Roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Reputation Factory",
  description: "Track reputation of DAO members easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${_Roboto.className}`}>
        <Web3Provider>
        <Navbar/>
        {children}
        </Web3Provider>
        </body>
    </html>
  );
}