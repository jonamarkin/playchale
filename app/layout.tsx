import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PlayChaleProvider } from "../components/PlayChaleProvider";
import { ThemeProvider } from "../components/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "PlayChale - Your Verified Sports Identity",
  description: "Verified Sports Identity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakartaSans.className}>
        <ThemeProvider defaultTheme="dark" storageKey="playchale-theme">
          <PlayChaleProvider>
            {children}
          </PlayChaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
