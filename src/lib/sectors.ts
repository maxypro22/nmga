export type DivisionCompany = {
  name: string;
  description: string;
  externalUrl?: string;
};

import type { IconName } from "@/components/ui/Icon";

export type Division = {
  number: string;
  name: string;
  slug: string;
  /** Icon used on division cards and section headers. */
  icon: IconName;
  /** Representative cover image shown on home cards and the divisions timeline. */
  coverImage: string;
  /** Short blurb used on the Home page Divisions Summary cards. */
  summary: string;
  /** Slightly longer intro used at the top of each section on /divisions. */
  intro: string;
  companies: DivisionCompany[];
};

export const sectors: readonly Division[] = [
  {
    number: "01",
    name: "Hospitality",
    slug: "hospitality",
    icon: "hotel",
    coverImage: "/images/sapphire-plaza/hero-interior.jpg",
    summary:
      "Hotels and restaurant operations focused on guest experience and service quality.",
    intro:
      "Hotels and restaurant operations focused on guest experience, service standards, and quality hospitality delivery in Doha.",
    companies: [
      {
        name: "Sapphire Plaza Hotel",
        description:
          "A 4-star hotel in Doha offering rooms, restaurants, banquet halls, gym, and meeting facilities.",
        externalUrl: "https://sapphire-hotels.com/",
      },
      {
        name: "Steak Town",
        description:
          "A premium steakhouse brand offering quality steaks and a modern dining experience in Doha.",
        externalUrl: "https://steaktown.qa/",
      },
    ],
  },
  {
    number: "02",
    name: "Real Estate",
    slug: "real-estate",
    icon: "building",
    coverImage: "/images/al-emara/service-villas.webp",
    summary:
      "Property leasing, sales, and practical real estate support for modern residential and business needs.",
    intro:
      "Property leasing, sales, and real estate services designed to support modern residential and business needs.",
    companies: [
      {
        name: "Dania Real Estate",
        description:
          "Property leasing, sales, investment advisory, and tenant relations support in Doha, Qatar.",
      },
    ],
  },
  {
    number: "03",
    name: "Construction",
    slug: "construction",
    icon: "hardhat",
    coverImage: "/images/al-emara/hero-slide-01.jpg",
    summary:
      "Contracting, fit-out works, and technical project delivery for commercial and residential needs.",
    intro:
      "Commercial and residential construction support with a focus on contracting, fit-out works, and project delivery.",
    companies: [
      {
        name: "Al Emara Al Islamiya Trading & Contracting",
        description:
          "General contracting, interior works, and MEP services supporting practical development needs in Qatar.",
        externalUrl: "https://alemara.qa/",
      },
    ],
  },
  {
    number: "04",
    name: "Events",
    slug: "events",
    icon: "calendar",
    coverImage: "/images/al-anaqa/intro-main.webp",
    summary:
      "Wedding planning, corporate events, and social celebrations with structured execution.",
    intro:
      "Wedding planning, corporate events, and social celebrations delivered with creativity, coordination, and structured execution.",
    companies: [
      {
        name: "Al Anaqh Events & Wedding Planning",
        description:
          "Wedding planning and professional event services for private and corporate occasions in Doha.",
        externalUrl: "https://alanaka.qa/",
      },
    ],
  },
  {
    number: "05",
    name: "Services",
    slug: "services",
    icon: "sparkles",
    coverImage: "/images/dania-maids/service-home.webp",
    summary:
      "Residential, office, and hospitality support services delivered with dependable daily operations.",
    intro:
      "Domestic and commercial support services delivered with trained teams, high standards, and dependable day-to-day service.",
    companies: [
      {
        name: "Dania Maids",
        description:
          "Residential and office cleaning, deep cleaning, and hospitality support services in Doha, Qatar.",
        externalUrl: "https://dania-maids.com/",
      },
    ],
  },
  {
    number: "06",
    name: "Technology",
    slug: "technology",
    icon: "terminal",
    coverImage: "/images/next-it/hero-secondary.png",
    summary:
      "Software systems and digital solutions that improve workflow and business efficiency.",
    intro:
      "Digital transformation, software systems, and business technology solutions that improve workflow, control, and operational efficiency.",
    companies: [
      {
        name: "NexIT Global",
        description:
          "Digital data management, software services, document systems, and workflow solutions for business operations.",
        externalUrl: "https://nexitglobal.com/",
      },
    ],
  },
  {
    number: "07",
    name: "AI",
    slug: "ai",
    icon: "cpu",
    coverImage: "/images/five-nodes/cover.jpg",
    summary:
      "Intelligent automation and AI-driven systems for communication, workflow, and operations.",
    intro:
      "Advanced AI and automation solutions built to support communication, workflow, analytics, and intelligent business operations.",
    companies: [
      {
        name: "Five Nodes AI",
        description:
          "AI systems engineering, workflow automation, AI communication systems, and intelligent business support in Doha, Qatar.",
        externalUrl: "https://fivenodes.ai/",
      },
    ],
  },
];
