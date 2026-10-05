import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Portfolio | Projects & Case Studies",
  description: "A curated portfolio of websites, SaaS products, UI/UX designs, clone products and in-house projects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
