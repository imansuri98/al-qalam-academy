import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Arabi | Master Conversational Fusha & Classical Arabic Grammar",
  description:
    "Learn Modern Standard Arabic (Conversational Fusha) and Classical Grammar rules (I'rab & Tashkeel) with zero transliteration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased min-h-screen bg-claude-bg text-claude-textMain flex flex-col">
        {children}
      </body>
    </html>
  );
}
