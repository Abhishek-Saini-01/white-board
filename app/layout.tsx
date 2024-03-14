import Loading from "@/components/auth/Loading";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convexClientProvider";
import { ModalProvider } from "@/providers/modalProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "White board",
  description: "A board to write anything you desire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <Suspense fallback={<Loading />}>
            <ConvexClientProvider>
              <Toaster />
              <ModalProvider />
              {children}
            </ConvexClientProvider>
          </Suspense>
        </body>
      </html>
  );
}
