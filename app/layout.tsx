import type { Metadata, Viewport } from "next";
import "./globals.css";
import RegisterSw from "@/components/RegisterSw";
import { withBase } from "@/lib/base";

export const metadata: Metadata = {
  title: "Bodie's Arcade",
  description: "Retro games and picture books that teach sight words. One kid, one Dad, no ads.",
  applicationName: "Bodie's Arcade",
  manifest: withBase("/manifest.webmanifest"),
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Arcade" },
  icons: { icon: withBase("/icons/icon.svg"), apple: withBase("/icons/apple-touch-icon.png") },
  formatDetection: { telephone: false },
  robots: { index: false, follow: false }, // family app: keep it out of search engines
  other: { "mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#150f30",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {/* Self-hosted fonts (public/fonts) so the shell and both play pages work offline. */}
        <link rel="stylesheet" href={withBase("/fonts/fonts.css")} />
      </head>
      <body>
        {children}
        <RegisterSw />
      </body>
    </html>
  );
}
