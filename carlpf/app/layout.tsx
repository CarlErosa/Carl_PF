import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#334B35",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Carl Erosa | Developer & Designer",
  description:
    "Full-stack developer and UI/UX designer specializing in web applications, sustainability tech, and data structures education. Explore my projects including Verde, ICPEP NCR, LOGISTIQ, and more.",
  openGraph: {
    title: "Carl Erosa | Developer & Designer",
    description:
      "Full-stack developer and UI/UX designer building clean, modern digital experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carl Erosa | Developer & Designer",
    description:
      "Full-stack developer and UI/UX designer building clean, modern digital experiences.",
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
        {children}
      </body>
    </html>
  );
}
