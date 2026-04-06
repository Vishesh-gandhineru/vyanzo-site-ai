import type { Metadata } from "next";
import { Figtree, Noto_Serif } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vyanzo | Industrial Casting Solutions",
  description:
    "Delivering unparalleled casting solutions across the globe with precision, scale, and reliability.",
  icons: {
    icon: "/Favicon.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} style={{ colorScheme: "light" }}>
       <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className={`${figtree.variable} ${notoSerif.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
