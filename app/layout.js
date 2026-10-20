import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import site from "@/content/site.json";
import "./globals.css";

const sans = Bricolage_Grotesque({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: {
    default: site.seo.titleDefault,
    template: site.seo.titleTemplate,
  },
  description: site.seo.description,
  openGraph: {
    title: site.seo.titleDefault,
    description: site.seo.description,
    siteName: site.name,
    locale: site.seo.locale,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#1f0c16",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
