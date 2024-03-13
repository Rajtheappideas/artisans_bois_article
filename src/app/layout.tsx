import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import { GlobalContextProvider } from "@/context/globalContext";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./global-error";
import { Suspense } from "react";
import Loading from "./loading";

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
        <ErrorBoundary errorComponent={Error}>
          <Suspense fallback={<Loading />}>
            <StoreProvider>
              <GlobalContextProvider>
                <Header />
                <main>{children}</main>
                <Footer />
              </GlobalContextProvider>
            </StoreProvider>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
