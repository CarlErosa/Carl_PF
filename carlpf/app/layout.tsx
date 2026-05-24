import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import CursorFollower from "./components/CursorFollower";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#1E2E20",
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
        className={`${inter.className} ${geistMono.className} antialiased`}
      >
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
