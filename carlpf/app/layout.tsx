import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Carl Erosa | Software & Cloud Enthusiast",
  description:
    "Software & Cloud Engineer specializing in scalable backend systems, cloud infrastructure, CI/CD pipelines, and full-stack web development.",
  openGraph: {
    title: "Carl Erosa | Software & Cloud Engineer",
    description:
      "Software & Cloud Engineer specializing in scalable backend systems, cloud infrastructure, CI/CD pipelines, and full-stack web development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carl Erosa | Software & Cloud Engineer",
    description:
      "Software & Cloud Engineer specializing in scalable backend systems, cloud infrastructure, CI/CD pipelines, and full-stack web development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
        <SmoothScroll />
        <div className="min-h-screen with-sidebar">{children}</div>
      </body>
    </html>
  );
}
