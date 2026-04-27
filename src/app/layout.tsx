import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamidsharifi.com"),
  title: "Hamid Sharifi — Designer & Developer | Winston-Salem, NC",
  description:
    "10+ years of experience in graphic design, UI/UX, and web development. Based in Winston-Salem, NC. Serving Winston-Salem, Greensboro, High Point, Kernersville, Clemmons, and surrounding North Carolina communities.",
  keywords:
    "graphic designer Winston-Salem NC, web designer Winston-Salem, UI UX designer North Carolina, web developer Winston-Salem, branding Greensboro NC, web design High Point NC, graphic design Kernersville, web development Clemmons NC, logo design North Carolina, Hamid Sharifi designer",
  openGraph: {
    title: "Hamid Sharifi — Designer & Developer | Winston-Salem, NC",
    description:
      "10+ years of experience in graphic design, UI/UX, and web development. Based in Winston-Salem, NC. Serving Winston-Salem, Greensboro, High Point, Kernersville, Clemmons, and surrounding North Carolina communities.",
    url: "https://hamidsharifi.com",
    siteName: "Hamid Sharifi",
    images: [
      {
        url: "/hamidsharifi-og.png",
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
    images: ["/hamidsharifi-og.png"],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://hamidsharifi.com/#person",
      name: "Hamid Sharifi",
      jobTitle: "Designer & Developer",
      description:
        "10+ years of experience in graphic design, UI/UX, and web development. Based in Winston-Salem, NC.",
      url: "https://hamidsharifi.com",
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
      "@id": "https://hamidsharifi.com/#business",
      name: "Hamid Sharifi — Designer & Developer",
      description:
        "Graphic design, UI/UX, and web development services in Winston-Salem, NC. Serving Winston-Salem, Greensboro, High Point, Kernersville, Clemmons, Lewisville, and all of North Carolina.",
      url: "https://hamidsharifi.com",
      email: "hamid@tandem78.com",
      founder: { "@id": "https://hamidsharifi.com/#person" },
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
        <Script
          id="microsoft-clarity"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","l909vgpwy1");`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
