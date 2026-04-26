import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Citendia",
  description: "Clientes, llamadas y facturacion.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  }
};

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
