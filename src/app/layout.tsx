import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

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
          <Header />
          {/* <LoginModal/> */}
          {/* <SignupModal /> */}
          {/* <SearchModal /> */}
          {/* <ForgotPasswordModal/> */}
          {/* <ResetPasswordModal /> */}
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
