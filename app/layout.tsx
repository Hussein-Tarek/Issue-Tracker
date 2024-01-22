import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <Navbar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
