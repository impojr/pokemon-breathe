import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "@/components/BootstrapClient.js";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Pokemon Breathe",
  description: "Guided Breathing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
