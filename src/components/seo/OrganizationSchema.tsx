const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://nmj-group.qa/#organization",
  name: "NMJ Group",
  alternateName: ["Dania Group", "NMJ", "مجموعة NMJ"],
  legalName: "NMJ Group",
  url: "https://nmj-group.qa",
  logo: {
    "@type": "ImageObject",
    url: "https://nmj-group.qa/logo.png",
    width: 400,
    height: 400,
  },
  foundingDate: "1991",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "QA",
      addressLocality: "Doha",
    },
  },
  description:
    "NMJ Group is a diversified business group headquartered in Doha, Qatar. The group operates across hospitality, real estate, construction, events, services, technology, and AI.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3rd Floor, Al Muftah Plaza, Al Rayyan Road",
    addressLocality: "Fereej Bin Mahmoud, Doha",
    addressRegion: "Doha",
    postalCode: "523",
    addressCountry: "QA",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+974-4444-0085",
      contactType: "customer service",
      areaServed: ["QA", "KW", "GB"],
      availableLanguage: ["English", "Arabic"],
    },
  ],
  sameAs: [
    "https://sapphire-hotels.com",
    "https://dania-maids.com",
    "https://alemara.qa",
    "https://nexitglobal.com",
    "https://fivenodes.ai",
    "https://steaktown.qa",
    "https://alanaka.qa",
  ],
  subOrganization: [
    {
      "@type": "Hotel",
      name: "Sapphire Plaza Hotel",
      url: "https://sapphire-hotels.com",
      description:
        "Four-star deluxe hotel in Doha with 174 rooms and three dining venues.",
    },
    {
      "@type": "RealEstateAgent",
      name: "Dania Real Estate",
      foundingDate: "1997",
      description:
        "Qatari real estate company managing residential and commercial properties across Doha.",
    },
    {
      "@type": "Organization",
      name: "Al Emara Al Islamiya",
      url: "https://alemara.qa",
      foundingDate: "1991",
      description:
        "Qatar's premier luxury villa and palace construction company. ISO 9001, 14001, and 45001 certified.",
    },
    {
      "@type": "Organization",
      name: "Next IT",
      url: "https://nexitglobal.com",
      description:
        "Enterprise business process management software for Qatar's largest institutions.",
    },
    {
      "@type": "Organization",
      name: "Five Nodes",
      url: "https://fivenodes.ai",
      description:
        "AI automation studio with offices in Qatar, the United Kingdom, and Kuwait.",
    },
    {
      "@type": "Restaurant",
      name: "Steak Town",
      url: "https://steaktown.qa",
      description:
        "Premium steakhouse in Doha known for hot-stone steaks and Wagyu burgers.",
    },
    {
      "@type": "Organization",
      name: "Al Anaqa",
      url: "https://alanaka.qa",
      description:
        "Events management and wedding planning company partnering with Qatar's finest hotels.",
    },
    {
      "@type": "Organization",
      name: "Dania Maids",
      url: "https://dania-maids.com",
      foundingDate: "1998",
      description:
        "Qatar's first BICSc-accredited professional cleaning and facility services company.",
    },
  ],
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 200 },
  areaServed: [
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "United Kingdom" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://nmj-group.qa/#website",
  url: "https://nmj-group.qa",
  name: "NMJ Group",
  publisher: { "@id": "https://nmj-group.qa/#organization" },
  inLanguage: ["en-QA", "ar-QA"],
};

export function OrganizationSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
