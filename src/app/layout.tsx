import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ApplicationProviders } from "./core/providers/application-providers";

const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm_sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | template",
    default: "template",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${dm_sans.variable}`} lang="pt">
      <body className={`bg-zinc-200 text-zinc-50 antialiased overflow-hidden`}>
        <ApplicationProviders>{children}</ApplicationProviders>
      </body>
    </html>
  );
}
