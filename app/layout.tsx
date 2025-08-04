import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import enCommon from "../locales/en/common.json";
import arCommon from "../locales/ar/common.json";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getLocale(): Promise<"en" | "ar"> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;
  return locale === "ar" ? "ar" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = locale === "ar" ? (arCommon as any) : (enCommon as any);

  return {
    title: t["site_title"],
    description: t["site_description"],
    alternates: {
      languages: {
        en: "/",
        ar: "/?lang=ar",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t["site_title"],
      description: t["site_description"],
    },
    twitter: {
      title: t["site_title"],
      description: t["site_description"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning={true}
    >
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="alternate" hrefLang="en" href="/" />
        <link rel="alternate" hrefLang="ar" href="/?lang=ar" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
