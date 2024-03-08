import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import {
  GlobalContextProvider,
  useGlobalContext,
} from "@/context/globalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artisans&Bois - article",
  description: "Articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <StoreProvider>
          <GlobalContextProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </GlobalContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
