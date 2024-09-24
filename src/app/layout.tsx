import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import { PDFStoreProvider } from '@/providers/pdf-store-provider'
import { UserProvider } from '../context/userContext';
import { useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Iron Wall",
  description: "Preventive Drug Education Media Creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
        <NextUIProvider>
          <PDFStoreProvider>
            {children}
          </PDFStoreProvider>
        </NextUIProvider>
        </UserProvider>
      </body>
    </html>
  );
}
