import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "KumbhSaarthi AI — Pilgrim Assistant | Mahakumbh 2028",
  description: "AI-powered multilingual digital companion for Mahakumbh 2028 pilgrims. Navigation, crowd monitoring, emergency SOS, accommodation, events & more.",
  keywords: "Kumbh Mela, Mahakumbh 2028, Ujjain, pilgrim assistant, AI, navigation, crowd monitor",
  authors: [{ name: "KumbhSaarthi AI Team" }],
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
