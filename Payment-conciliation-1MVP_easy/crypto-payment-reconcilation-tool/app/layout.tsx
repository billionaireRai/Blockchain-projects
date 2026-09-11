
import type { Metadata } from "next";
import Providers from "./provider";
import { ThemeProvider } from "@/components/ThemeProvider";
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
      <body className="h-full flex flex-col rounded-lg font-rubik">
      <ThemeProvider>
       <Providers>
         <div id="scrollsec" className="relative flex flex-col h-fit overflow-y-auto overflow-x-hidden rounded-lg">
          <NavigationBar />
          {children}
         </div>
       </Providers>
      </ThemeProvider>
      </body>
    </html>
  );
}
