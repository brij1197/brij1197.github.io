import "./globals.css";
import { profile } from "@/content/portfolio";
const title = "Brij Bhatia - Software Engineer";

const previewDescription = `${profile.role} at ${profile.company}. Projects, experience, and résumé.`;
export const metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description: "Brij's Portfolio Website",
  alternates: { canonical: "/" },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/logo.webp`,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description: previewDescription,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: previewDescription,
  },
};
export const viewport = { themeColor: "#0d0e12" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
