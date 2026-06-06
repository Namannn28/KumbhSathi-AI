import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "KumbhSaarthi AI - Pilgrim Assistant",
  description: "AI-powered multilingual assistant for Mahakumbh pilgrims",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
