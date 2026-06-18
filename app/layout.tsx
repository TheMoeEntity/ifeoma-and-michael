import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";
import Toaster from "./components/Toaster";
import LoadingScreen from "./components/LoadingScreen";
import ScrollTop from "./components/ScrollTop";
import { Analytics } from "@vercel/analytics/next";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ifeoma & Michael 2026",
  description:
    "Join us as we celebrate the wedding of Ifeoma and Michael on the 6th of August, 2026.",
  openGraph: {
    title: "Ifeoma & Michael 2026",
    description:
      "Join us as we celebrate the wedding of Ifeoma and Michael on the 6th of August, 2026.",
    url: "/",
    siteName: "Ifeoma & Michael Wedding",
    images: [
      {
        url: "https://ifeomamichael.com/im_banner.png",
        width: 1200,
        height: 630,
        alt: "Ifeoma and Michael Wedding Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ifeoma & Michael 2026",
    description:
      "Join us as we celebrate the wedding of Ifeoma and Michael on August 6th, 2026.",
    images: ["https://ifeomamichael.com/im_banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        {children}
        <ScrollTop />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
