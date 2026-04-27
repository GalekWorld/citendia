import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { rootMetadata } from "@/lib/seo";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={manrope.variable} lang="es">
      <body className="font-sans text-ink antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
