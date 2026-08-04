import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Cinzel } from "next/font/google";
import CursorFollower from "./components/CursorFollower";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-cinzel",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Carl Erosa | Software & Cloud Engineer",
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
      <body
        className={`${inter.className} ${geistMono.className} ${cinzel.variable} antialiased`}
      >
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
