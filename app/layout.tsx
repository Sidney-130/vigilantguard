import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarknetProvider from "./Providers";
import AOSWrapper from "../components/AosWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VigilantGuard",
  description: "Web3 Fraud Detection & Transaction Security",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarknetProvider>
          <AOSWrapper>{children}</AOSWrapper>
        </StarknetProvider>
      </body>
    </html>
  );
}
