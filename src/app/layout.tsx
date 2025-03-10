import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm_sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | template",
    default: "template",
  },
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  return (
    <html className={`${dm_sans.variable}`} lang="pt">
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <body className={`bg-zinc-200 text-zinc-50 antialiased`}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
