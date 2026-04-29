import LenisProvider from "@/components/common/LenisProvider";
import { personalData } from "@/data/personal";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personalData.name} — ${personalData.designation}`,
  description: personalData.tagline,
  keywords: ["portfolio", "developer", "web development", personalData.name],
  authors: [{ name: personalData.name }],
  openGraph: {
    title: `${personalData.name} — ${personalData.designation}`,
    description: personalData.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}