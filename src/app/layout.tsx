import type { Metadata } from "next";
import { Rubik, Archivo_Black, Fredoka } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const archivoBold = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ignitor - Neo Brutalism Game Launcher",
  description: "A modern, stylish game launcher designed with Neo Brutalism aesthetics",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${rubik.variable} ${archivoBold.variable} ${fredoka.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
