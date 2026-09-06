
import type { Metadata } from "next";
import Providers from "./provider";
import NavigationBar from "@/components/Navigation";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Paylume — Ethereum Payment Reconciliation",
  description:
    "Reconcile Ethereum payments with confidence. Paylume helps businesses track blockchain transactions, match payments, and maintain accurate financial records.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rubik.variable} h-full antialiased`} // tailwind approach for "font-rubik" 
    >
      <body className="h-full flex flex-col rounded-lg overflow-y-auto font-rubik">
       <Providers>
         <div className="relative rounded-lg">
          <NavigationBar />
          {children}
         </div>
       </Providers>
      </body>
    </html>
  );
}
