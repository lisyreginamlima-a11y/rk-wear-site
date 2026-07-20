import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://valentina-atelier-moda.lisyreginamlima.chatgpt.site",
  ),
  title: "RK WEAR | Moda autoral brasileira",
  description:
    "Peças autorais, alfaiataria leve e essenciais feitos no Brasil para atravessar temporadas.",
  openGraph: {
    title: "RK WEAR | Moda autoral brasileira",
    description:
      "Peças autorais, alfaiataria leve e essenciais feitos no Brasil para atravessar temporadas.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "RK WEAR — moda autoral brasileira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RK WEAR | Moda autoral brasileira",
    description:
      "Peças autorais, alfaiataria leve e essenciais feitos no Brasil para atravessar temporadas.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
