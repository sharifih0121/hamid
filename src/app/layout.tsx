import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hamid Sharifi — Designer & Developer",
  description:
    "10+ years of experience in graphic design, UI/UX, and web development. Based in Winston-Salem, NC. Turning ideas into powerful digital experiences.",
  keywords: "graphic design, UI/UX design, web design, web development, branding, Winston-Salem",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
