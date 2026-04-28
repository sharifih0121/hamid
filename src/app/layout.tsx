import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hamidsharifi.com"),
  title: "Hamid Sharifi — Designer & Developer | Winston-Salem, NC",
  description:
    "10+ years of experience in graphic design, UI/UX, and web development. Based in Winston-Salem, NC. Serving Winston-Salem, Greensboro, High Point, Kernersville, Clemmons, and surrounding North Carolina communities.",
  keywords:
    "graphic designer Winston-Salem NC, web designer Winston-Salem, UI UX designer North Carolina, web developer Winston-Salem, branding Greensboro NC, web design High Point NC, graphic design Kernersville, web development Clemmons NC, logo design North Carolina, Hamid Sharifi designer",
  openGraph: {
    title: "Hamid Sharifi — Designer & Developer | Winston-Salem, NC",
    description:
      "10+ years of experience in graphic design, UI/UX, and web development. Based in Winston-Salem, NC. Serving Winston-Salem, Greensboro, High Point, Kernersville, Clemmons, and surrounding North Carolina communities.",
    url: "https://www.hamidsharifi.com",
    siteName: "Hamid Sharifi",
    images: [
      {
        url: "https://www.hamidsharifi.com/hamidsharifi-og.png",
        width: 1200,
        height: 630,
        alt: "Hamid Sharifi — Designer & Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamid Sharifi — Designer & Developer | Winston-Salem, NC",
    description:
      "10+ years of experience in graphic design, UI/UX, and web development. Based in Winston-Salem, NC.",
    images: ["https://www.hamidsharifi.com/hamidsharifi-og.png"],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.hamidsharifi.com/#person",
      name: "Hamid Sharifi",
      jobTitle: "Designer & Developer",
      description:
        "10+ years of experience in graphic design, UI/UX, and web development. Based in Winston-Salem, NC.",
      url: "https://www.hamidsharifi.com",
      email: "hamid@tandem78.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Winston-Salem",
        addressRegion: "NC",
        addressCountry: "US",
      },
      knowsAbout: [
        "Graphic Design",
        "UI/UX Design",
        "Web Design",
        "Web Development",
        "Branding",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.hamidsharifi.com/#business",
      name: "Hamid Sharifi — Designer & Developer",
      description:
        "Graphic design, UI/UX, and web development services in Winston-Salem, NC. Serving Winston-Salem, Greensboro, High Point, Kernersville, Clemmons, Lewisville, and all of North Carolina.",
      url: "https://www.hamidsharifi.com",
      email: "hamid@tandem78.com",
      founder: { "@id": "https://www.hamidsharifi.com/#person" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Winston-Salem",
        addressRegion: "NC",
        addressCountry: "US",
      },
      areaServed: [
        "Winston-Salem, NC",
        "Greensboro, NC",
        "High Point, NC",
        "Kernersville, NC",
        "Clemmons, NC",
        "Lewisville, NC",
        "Lexington, NC",
        "Salisbury, NC",
        "North Carolina",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Design & Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Branding" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "UI/UX Design" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Web Design" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Web Development" },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <Script
          id="recaptcha-enterprise"
          strategy="afterInteractive"
          src="https://www.google.com/recaptcha/enterprise.js?render=6LdPbs0sAAAAAHd1MFgSGJn9uECTCyiXaetbrnyW"
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P6NBQBKK');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P6NBQBKK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <div
          aria-hidden="true"
          style={{ display: 'none' }}
          dangerouslySetInnerHTML={{
            __html: `<!--\n  hamidsharifi.com\n  Last published: ${new Date().toUTCString()}\n  © ${new Date().getFullYear()} Hamid Sharifi. All rights reserved.\n-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
