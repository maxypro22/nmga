/**
 * Lightweight bilingual (English / Arabic) dictionary + path helpers.
 *
 * - English lives at the site root (`/`, `/about`, …).
 * - Arabic lives under `/ar` (`/ar`, `/ar/about`, …) and renders RTL.
 *
 * This module is plain data (no "server-only") so it can be imported from
 * both server and client components.
 */

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const dir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const htmlLang: Record<Locale, string> = {
  en: "en-QA",
  ar: "ar-QA",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Locale implied by a pathname (`/ar` or `/ar/...` → "ar"). */
export function localeFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return "ar";
  return "en";
}

/** Remove a leading `/ar` so the path is locale-neutral (always starts with "/"). */
export function stripLocale(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

/** Prefix a locale-neutral path for the given locale. */
export function withLocale(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  if (clean === "/") return "/ar";
  return `/ar${clean}`;
}

/** Same page in the other language (used by the toggle button). */
export function swapLocalePath(pathname: string): string {
  const locale = localeFromPathname(pathname);
  const neutral = stripLocale(pathname);
  return withLocale(neutral, locale === "en" ? "ar" : "en");
}

// ============================================================
// Dictionaries
// ============================================================

const en = {
  nav: {
    home: "Home",
    about: "About",
    divisions: "Divisions",
    contact: "Contact",
    careers: "Careers",
    newsroom: "Newsroom",
    contactCta: "Contact Us",
    toggleLabel: "العربية",
    toggleAria: "Switch to Arabic",
    openMenu: "Open menu",
    home_aria: "NMJ Group — Home",
  },
  common: {
    scroll: "Scroll",
    viewAllDivisions: "View all divisions",
    readMoreAboutUs: "Read more about us",
    contactUs: "Contact Us",
    emailUs: "Email Us",
    getInTouch: "Get in touch",
  },
  home: {
    hero: {
      tagline: "A Diversified Qatari Group · Since 1991",
      headline: "Delivering Excellence Across Diversified Industries.",
      subhead:
        "A privately held Qatari business group headquartered in Doha, with a portfolio of divisions spanning hospitality, real estate, construction, events, services, technology, and AI.",
      ctaPrimary: "Our Divisions",
      ctaSecondary: "Partner With Us",
    },
    overview: {
      eyebrow: "At a glance",
      heading: "A Legacy of Quality and Operational Excellence",
      cards: [
        {
          label: "Headquarters",
          value: "Doha, Qatar",
          support: "Strategically located at the heart of the region's growth.",
        },
        {
          label: "Core Sectors",
          value: "Hospitality, Real Estate, Construction & beyond",
          support: "Seven sectors driving value across the Qatari market.",
        },
        {
          label: "Business Units",
          value: "8 Specialized Divisions",
          support: "A diversified portfolio managed with operational discipline.",
        },
      ],
    },
    identity: {
      eyebrow: "Principles",
      heading: "Our Strategic Foundation",
      cards: [
        {
          tag: "Vision",
          title: "A leading diversified group in Qatar and the region.",
          body: "To be recognised across hospitality, real estate, construction, technology, and AI as a group defined by quality, trust, and operational excellence.",
        },
        {
          tag: "Mission",
          title: "Deliver high-quality services and innovative solutions.",
          body: "To serve individual and corporate clients across every sector with consistency, reliability, and a focus on long-term value creation.",
        },
        {
          tag: "Values",
          title: "Integrity. Excellence. Innovation.",
          body: "We hold every division to one standard — disciplined operations, genuine customer focus, and a commitment to enduring quality.",
        },
      ],
    },
    divisions: {
      eyebrow: "Divisions",
      heading: "Our Business Divisions",
      intro:
        "NMJ Group operates across multiple divisions, each serving a distinct sector while contributing to one shared standard of quality, service, and growth.",
      explore: "Explore",
      divisionWord: "Division",
      partnerTitle: "Partner with Us",
      partnerBody: "Looking to grow your business in the Qatari market?",
      partnerCta: "Connect now",
    },
    leadership: {
      eyebrow: "Leadership",
      heading: "Driven by Experienced Leadership",
      body: "NMJ Group continues to grow through disciplined leadership, strategic direction, and a strong focus on long-term value creation across all divisions.",
      bullets: [
        "Strategic Growth & Innovation",
        "Integrated Business Solutions",
        "Operational Accountability",
        "Commitment to Value Creation",
      ],
    },
    future: {
      eyebrow: "Looking ahead",
      heading: "Future Expansion Strategy",
      cards: [
        {
          title: "Hospitality Expansion",
          body: "Scaling our footprint with premium experiences across the region.",
        },
        {
          title: "Real Estate Development",
          body: "Sustainable urban developments and high-value commercial assets.",
        },
        {
          title: "Construction & Events Growth",
          body: "Stronger technical delivery for projects and signature events.",
        },
        {
          title: "Technology & AI Integration",
          body: "Embedding intelligent automation across every business unit.",
        },
      ],
    },
    cta: {
      eyebrow: "Connect",
      heading: "Connect with NMJ Group",
      body: "For business inquiries, partnerships, or general information, contact our team in Doha, Qatar.",
      channels: [
        { label: "Our Office", value: "Al Muftah Plaza, Al Reem Street · Doha, Qatar" },
        { label: "Call Center", value: "+974 4444 0085" },
        { label: "Email", value: "info@nmj-group.qa" },
      ],
    },
  },
  about: {
    hero: {
      headline: "About NMJ Group",
      subhead:
        "NMJ Group is a diversified business group based in Doha, Qatar, with operations across hospitality, real estate, construction, events, services, technology, and AI.",
      cta: "Contact our team",
    },
    group: {
      eyebrow: "Who we are",
      heading: "A Diversified Group Built for Modern Business",
      paragraphs: [
        "NMJ Group brings together a portfolio of specialized divisions serving both individual and corporate needs across multiple industries in Qatar.",
        "Our businesses span hospitality, dining, real estate, contracting, cleaning services, software, and AI-driven solutions, allowing us to operate across sectors while maintaining a clear standard of quality, reliability, and service.",
        "At NMJ Group, we focus on long-term value, customer trust, and sustainable growth through a connected business structure and a shared commitment to excellence.",
      ],
    },
    drives: {
      eyebrow: "What drives us",
      heading: "Mission, Vision, and Values",
      mission: {
        tag: "Mission",
        title: "Deliver exceptional services across every sector.",
        body: "Across hospitality, real estate, contracting, technology, AI, and lifestyle — delivered through quality, innovation, and reliability.",
      },
      vision: {
        tag: "Vision",
        title: "A leading, trusted diversified group in Qatar.",
        body: "Recognised for excellence, innovation, and trust across all of the sectors we operate in.",
      },
      values: {
        tag: "Core Values",
        title: "The standards behind every division.",
        items: [
          "Excellence",
          "Integrity",
          "Customer Focus",
          "Innovation",
          "Collaboration",
          "Reliability",
          "Sustainability",
        ],
      },
    },
    offer: {
      eyebrow: "What we offer",
      heading: "Services across every sector we serve",
      items: [
        {
          title: "Hotels & Restaurants",
          body: "We deliver hospitality and dining experiences through Sapphire Plaza Hotel and Steak Town Restaurant.",
        },
        {
          title: "Event Planning",
          body: "Al Anaqh Events & Wedding Planning provides tailored event solutions with creativity, precision, and smooth execution.",
        },
        {
          title: "Construction & Real Estate",
          body: "Through Al Emara Al Islamiya Trading & Contracting and Dania Real Estate, we provide practical property, contracting, and development support.",
        },
        {
          title: "Cleaning Services",
          body: "Dania Maids offers residential and commercial cleaning solutions with a focus on quality, hygiene, and dependable service.",
        },
        {
          title: "IT & AI Solutions",
          body: "NexIT Global and Five Nodes AI support business innovation through software, digital systems, automation, and AI-powered operational solutions.",
        },
      ],
    },
    leadership: {
      eyebrow: "Leadership message",
      heading: "Message from Leadership",
      paragraphs: [
        "At NMJ Group, our journey reflects ambition, resilience, and a clear purpose to create lasting value in Qatar.",
        "Each division within our group is built on a commitment to quality, trust, and meaningful service for our clients, partners, and community.",
        "As we continue to grow, we remain focused on progress, responsibility, innovation, and long-term impact across every sector we serve.",
      ],
    },
    cta: {
      eyebrow: "Get in touch",
      heading: "Get in Touch with NMJ Group",
      body: "For business inquiries, partnerships, or general information, contact NMJ Group in Doha, Qatar.",
      primary: "Contact Us",
      secondary: "View All Divisions",
    },
  },
  divisionsPage: {
    hero: {
      headline: "NMJ Group Divisions",
      subhead:
        "Integrated business solutions across hospitality, real estate, construction, events, services, technology, and AI in Doha, Qatar.",
      cta: "Contact us",
    },
    intro: {
      eyebrow: "Overview",
      heading: "A Diversified Business Structure",
      body: "NMJ Group operates across multiple divisions, each serving a distinct sector while contributing to one shared standard of quality, operational excellence, and long-term growth in Qatar.",
    },
    divisionWord: "Division",
    officialWebsite: "Official Website",
    contactViaMain: "Contact via Main Contact Page",
    future: {
      eyebrow: "Looking ahead",
      heading: "Future Expansion Strategy",
      cards: [
        {
          title: "Hospitality Expansion",
          body: "Scaling our footprint with premium experiences across the region.",
        },
        {
          title: "Real Estate Development",
          body: "Sustainable urban developments and high-value commercial assets.",
        },
        {
          title: "Growth in Construction and Events",
          body: "Stronger technical delivery for projects and signature events.",
        },
        {
          title: "Technology and AI Integration",
          body: "Embedding intelligent automation across every business unit.",
        },
      ],
    },
    cta: {
      eyebrow: "Get in touch",
      heading: "Connect with NMJ Group",
      body: "For division-related inquiries, partnerships, or general business information, contact NMJ Group in Doha, Qatar.",
      phone: "Phone",
      email: "Email",
      primary: "Inquire now",
      secondary: "Email us",
    },
  },
  contact: {
    hero: {
      headline: "Contact NMJ Group",
      subhead:
        "For business inquiries, partnerships, or general information, get in touch with NMJ Group in Doha, Qatar.",
    },
    info: {
      eyebrow: "Direct lines",
      heading: "Get in Touch",
      location: "Location",
      phone: "Phone",
      email: "Email",
      linkedin: "LinkedIn",
      linkedinValue: "NMJ Group on LinkedIn",
    },
    form: {
      eyebrow: "Send a message",
      heading: "Send Us a Message",
      desc: "Share your inquiry with our team and we will get back to you as soon as possible.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      opening: "Opening…",
      success:
        "Your email client should now be open with a pre-filled message — send it from there and we'll be in touch.",
    },
    location: {
      eyebrow: "Visit us",
      heading: "Our Location",
      body: "NMJ Group is based in Doha, Qatar. Visit our office location or view us on Google Maps.",
      mapsLink: "View NMJ Group on Google Maps & See Reviews",
    },
    finalCta: {
      eyebrow: "Connect with our team",
      heading: "Connect with Our Team",
      body: "We welcome business inquiries, partnership opportunities, and general communication through our contact channels.",
      call: "Call Now",
      email: "Email Us",
    },
  },
  footer: {
    blurb: "NMJ Group is a diversified business group based in Doha, Qatar.",
    quickLinks: "Quick Links",
    coreSectors: "Core Sectors",
    contactInfo: "Contact Info",
    location: "Doha, Qatar",
    rights: "All Rights Reserved.",
    tagline: "NMJ Group · Since 1991 · Doha, Qatar",
  },
  mobileMenu: {
    getInTouch: "Get in touch",
    contactUs: "Contact Us",
    address: "3rd Floor, Al Muftah Plaza · Al Reem Street · Doha, Qatar",
  },
  login: {
    badge: "NMJ Group · Admin",
    title: "Sign in",
    subtitle: "Access the content and theme management dashboard.",
    username: "Username",
    password: "Password",
    signIn: "Sign in",
    signingIn: "Signing in…",
    invalid: "Invalid credentials",
    networkError: "Network error. Please try again.",
  },
  dashboard: {
    brand: "NMJ Admin",
    menu: "Menu",
    close: "Close",
    adminLabel: "NMJ Group · Admin",
    dashboard: "Dashboard",
    signedInAs: "Signed in as",
    logout: "Logout",
    loggingOut: "Signing out…",
    nav: {
      overview: "Overview",
      content: "Content",
      jobs: "Jobs",
      newsroom: "Newsroom",
      theme: "Theme",
      admins: "Admins",
      account: "Account",
    },
    overview: {
      eyebrow: "Overview",
      welcome: "Welcome back",
      desc: "Update site content, swap accent colors, and manage admin access from here.",
      supabaseError: "Couldn't reach Supabase:",
      admins: "Admins",
      overrides: "Content overrides",
      editableFields: "Editable fields",
      status: "Status",
      online: "Online",
      customization: "Content customization",
      customizedOf: "of",
      customizedFields: "fields customized",
      quickLinks: [
        { href: "/dashboard/content", label: "Edit content", desc: "Update headlines, descriptions, and contact info across all pages." },
        { href: "/dashboard/theme", label: "Edit theme", desc: "Change the accent gold for light and dark mode." },
        { href: "/dashboard/admins", label: "Manage admins", desc: "Add or remove dashboard users." },
        { href: "/dashboard/account", label: "Account", desc: "Change your password or sign out." },
      ],
    },
  },
  careers: {
    hero: {
      eyebrow: "Join Our Team",
      headline: "Build Your Career at NMJ Group",
      subhead:
        "We are looking for talented individuals to join our growing teams across hospitality, real estate, construction, events, services, technology, and AI.",
      cta: "View Open Positions",
    },
    why: {
      eyebrow: "Why NMJ Group",
      heading: "Why Work With Us",
      cards: [
        {
          title: "Professional Growth",
          body: "Real career progression opportunities within a diversified, expanding group across seven active sectors.",
        },
        {
          title: "Diverse Sectors",
          body: "Gain cross-industry experience spanning hospitality, construction, technology, AI, and more.",
        },
        {
          title: "Collaborative Culture",
          body: "A workplace built on mutual respect, shared accountability, and a commitment to excellence.",
        },
        {
          title: "Local Impact",
          body: "Contribute to established enterprises that serve Qatar's residents, businesses, and community.",
        },
      ],
    },
    openings: {
      eyebrow: "Opportunities",
      heading: "Current Openings",
      intro:
        "We offer a range of professional openings across our divisions. Submit your application and our team will be in touch.",
      applyLabel: "Apply Now",
      typeLabel: "Type",
      locationLabel: "Location",
      divisionLabel: "Division",
    },
    apply: {
      eyebrow: "Get Started",
      heading: "Send Your Application",
      body: "Email your CV with the position title in the subject line. Our HR team reviews every application and will contact shortlisted candidates.",
      cta: "Email Your CV",
      email: "careers@nmj-group.qa",
      note: "We welcome applications from all backgrounds. NMJ Group is an equal-opportunity employer.",
    },
  },
  divisions: {
    items: {
      hospitality: {
        name: "Hospitality",
        summary:
          "Hotels and restaurant operations focused on guest experience and service quality.",
        intro:
          "Hotels and restaurant operations focused on guest experience, service standards, and quality hospitality delivery in Doha.",
        companies: {
          "Sapphire Plaza Hotel":
            "A 4-star hotel in Doha offering rooms, restaurants, banquet halls, gym, and meeting facilities.",
          "Steak Town":
            "A premium steakhouse brand offering quality steaks and a modern dining experience in Doha.",
        } as Record<string, string>,
      },
      "real-estate": {
        name: "Real Estate",
        summary:
          "Property leasing, sales, and practical real estate support for modern residential and business needs.",
        intro:
          "Property leasing, sales, and real estate services designed to support modern residential and business needs.",
        companies: {
          "Dania Real Estate":
            "Property leasing, sales, investment advisory, and tenant relations support in Doha, Qatar.",
        } as Record<string, string>,
      },
      construction: {
        name: "Construction",
        summary:
          "Contracting, fit-out works, and technical project delivery for commercial and residential needs.",
        intro:
          "Commercial and residential construction support with a focus on contracting, fit-out works, and project delivery.",
        companies: {
          "Al Emara Al Islamiya Trading & Contracting":
            "General contracting, interior works, and MEP services supporting practical development needs in Qatar.",
        } as Record<string, string>,
      },
      events: {
        name: "Events",
        summary:
          "Wedding planning, corporate events, and social celebrations with structured execution.",
        intro:
          "Wedding planning, corporate events, and social celebrations delivered with creativity, coordination, and structured execution.",
        companies: {
          "Al Anaqh Events & Wedding Planning":
            "Wedding planning and professional event services for private and corporate occasions in Doha.",
        } as Record<string, string>,
      },
      services: {
        name: "Services",
        summary:
          "Residential, office, and hospitality support services delivered with dependable daily operations.",
        intro:
          "Domestic and commercial support services delivered with trained teams, high standards, and dependable day-to-day service.",
        companies: {
          "Dania Maids":
            "Residential and office cleaning, deep cleaning, and hospitality support services in Doha, Qatar.",
        } as Record<string, string>,
      },
      technology: {
        name: "Technology",
        summary:
          "Software systems and digital solutions that improve workflow and business efficiency.",
        intro:
          "Digital transformation, software systems, and business technology solutions that improve workflow, control, and operational efficiency.",
        companies: {
          "NexIT Global":
            "Digital data management, software services, document systems, and workflow solutions for business operations.",
        } as Record<string, string>,
      },
      ai: {
        name: "AI",
        summary:
          "Intelligent automation and AI-driven systems for communication, workflow, and operations.",
        intro:
          "Advanced AI and automation solutions built to support communication, workflow, analytics, and intelligent business operations.",
        companies: {
          "Five Nodes AI":
            "AI systems engineering, workflow automation, AI communication systems, and intelligent business support in Doha, Qatar.",
        } as Record<string, string>,
      },
    } as Record<
      string,
      {
        name: string;
        summary: string;
        intro: string;
        companies: Record<string, string>;
      }
    >,
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    divisions: "الأقسام",
    contact: "اتصل بنا",
    careers: "الوظائف",
    newsroom: "الأخبار",
    contactCta: "تواصل معنا",
    toggleLabel: "English",
    toggleAria: "التبديل إلى الإنجليزية",
    openMenu: "فتح القائمة",
    home_aria: "مجموعة NMJ — الرئيسية",
  },
  common: {
    scroll: "مرّر",
    viewAllDivisions: "عرض جميع الأقسام",
    readMoreAboutUs: "اقرأ المزيد عنّا",
    contactUs: "تواصل معنا",
    emailUs: "راسلنا",
    getInTouch: "تواصل معنا",
  },
  home: {
    hero: {
      tagline: "مجموعة قطرية متنوّعة · منذ ١٩٩١",
      headline: "نقدّم التميّز عبر قطاعات متنوّعة.",
      subhead:
        "مجموعة أعمال قطرية خاصة يقع مقرها في الدوحة، تضم محفظة من الأقسام تشمل الضيافة والعقارات والإنشاءات والفعاليات والخدمات والتقنية والذكاء الاصطناعي.",
      ctaPrimary: "أقسامنا",
      ctaSecondary: "كن شريكنا",
    },
    overview: {
      eyebrow: "نظرة عامة",
      heading: "إرثٌ من الجودة والتميّز التشغيلي",
      cards: [
        {
          label: "المقر الرئيسي",
          value: "الدوحة، قطر",
          support: "موقع استراتيجي في قلب نمو المنطقة.",
        },
        {
          label: "القطاعات الأساسية",
          value: "الضيافة والعقارات والإنشاءات وغيرها",
          support: "سبعة قطاعات تصنع القيمة في السوق القطري.",
        },
        {
          label: "وحدات الأعمال",
          value: "٨ أقسام متخصصة",
          support: "محفظة متنوّعة تُدار بانضباط تشغيلي.",
        },
      ],
    },
    identity: {
      eyebrow: "المبادئ",
      heading: "أساسنا الاستراتيجي",
      cards: [
        {
          tag: "الرؤية",
          title: "مجموعة متنوّعة رائدة في قطر والمنطقة.",
          body: "أن نكون مرجعاً في الضيافة والعقارات والإنشاءات والتقنية والذكاء الاصطناعي، مجموعةً تتميّز بالجودة والثقة والتميّز التشغيلي.",
        },
        {
          tag: "الرسالة",
          title: "تقديم خدمات عالية الجودة وحلول مبتكرة.",
          body: "خدمة الأفراد والشركات في كل قطاع باتساق وموثوقية وتركيز على خلق قيمة طويلة الأمد.",
        },
        {
          tag: "القيم",
          title: "النزاهة. التميّز. الابتكار.",
          body: "نُخضع كل قسم لمعيار واحد: عمليات منضبطة، واهتمام حقيقي بالعميل، والتزام بجودة دائمة.",
        },
      ],
    },
    divisions: {
      eyebrow: "الأقسام",
      heading: "أقسام أعمالنا",
      intro:
        "تعمل مجموعة NMJ عبر أقسام متعددة، يخدم كل منها قطاعاً مميزاً مع التزامها جميعاً بمعيار مشترك من الجودة والخدمة والنمو.",
      explore: "استكشف",
      divisionWord: "قسم",
      partnerTitle: "كن شريكنا",
      partnerBody: "هل تتطلّع إلى تنمية أعمالك في السوق القطري؟",
      partnerCta: "تواصل الآن",
    },
    leadership: {
      eyebrow: "القيادة",
      heading: "بقيادةٍ خبيرة",
      body: "تواصل مجموعة NMJ نموّها عبر قيادة منضبطة وتوجّه استراتيجي وتركيز قوي على خلق قيمة طويلة الأمد في جميع الأقسام.",
      bullets: [
        "النمو الاستراتيجي والابتكار",
        "حلول أعمال متكاملة",
        "المساءلة التشغيلية",
        "الالتزام بخلق القيمة",
      ],
    },
    future: {
      eyebrow: "نحو المستقبل",
      heading: "استراتيجية التوسّع المستقبلي",
      cards: [
        {
          title: "التوسّع في الضيافة",
          body: "توسيع حضورنا بتجارب راقية عبر المنطقة.",
        },
        {
          title: "التطوير العقاري",
          body: "تطويرات عمرانية مستدامة وأصول تجارية عالية القيمة.",
        },
        {
          title: "نمو الإنشاءات والفعاليات",
          body: "تنفيذ تقني أقوى للمشاريع والفعاليات المميّزة.",
        },
        {
          title: "دمج التقنية والذكاء الاصطناعي",
          body: "تضمين الأتمتة الذكية في كل وحدة أعمال.",
        },
      ],
    },
    cta: {
      eyebrow: "تواصل",
      heading: "تواصل مع مجموعة NMJ",
      body: "للاستفسارات التجارية أو الشراكات أو المعلومات العامة، تواصل مع فريقنا في الدوحة، قطر.",
      channels: [
        { label: "مكتبنا", value: "المفتاح\nبلازا، شارع الريم · الدوحة، قطر" },
        { label: "مركز الاتصال", value: "+974 4444 0085" },
        { label: "البريد الإلكتروني", value: "info@nmj-group.qa" },
      ],
    },
  },
  about: {
    hero: {
      headline: "عن مجموعة NMJ",
      subhead:
        "مجموعة NMJ مجموعة أعمال متنوّعة مقرها الدوحة، قطر، بعمليات تشمل الضيافة والعقارات والإنشاءات والفعاليات والخدمات والتقنية والذكاء الاصطناعي.",
      cta: "تواصل مع فريقنا",
    },
    group: {
      eyebrow: "من نحن",
      heading: "مجموعة متنوّعة مبنيّة لأعمال العصر",
      paragraphs: [
        "تجمع مجموعة NMJ محفظة من الأقسام المتخصصة التي تلبّي احتياجات الأفراد والشركات عبر صناعات متعددة في قطر.",
        "تمتد أعمالنا عبر الضيافة والمطاعم والعقارات والمقاولات وخدمات التنظيف والبرمجيات والحلول المعتمدة على الذكاء الاصطناعي، ما يتيح لنا العمل عبر القطاعات مع الحفاظ على معيار واضح من الجودة والموثوقية والخدمة.",
        "في مجموعة NMJ، نركّز على القيمة طويلة الأمد وثقة العملاء والنمو المستدام عبر بنية أعمال مترابطة والتزام مشترك بالتميّز.",
      ],
    },
    drives: {
      eyebrow: "ما يحرّكنا",
      heading: "الرسالة والرؤية والقيم",
      mission: {
        tag: "الرسالة",
        title: "تقديم خدمات استثنائية في كل قطاع.",
        body: "عبر الضيافة والعقارات والمقاولات والتقنية والذكاء الاصطناعي ونمط الحياة — بجودة وابتكار وموثوقية.",
      },
      vision: {
        tag: "الرؤية",
        title: "مجموعة متنوّعة رائدة وموثوقة في قطر.",
        body: "مرجعٌ في التميّز والابتكار والثقة عبر كل القطاعات التي نعمل فيها.",
      },
      values: {
        tag: "القيم الأساسية",
        title: "المعايير وراء كل قسم.",
        items: [
          "التميّز",
          "النزاهة",
          "التركيز على العميل",
          "الابتكار",
          "التعاون",
          "الموثوقية",
          "الاستدامة",
        ],
      },
    },
    offer: {
      eyebrow: "ما نقدّمه",
      heading: "خدمات في كل قطاع نخدمه",
      items: [
        {
          title: "الفنادق والمطاعم",
          body: "نقدّم تجارب ضيافة وطعام عبر فندق سفير بلازا ومطعم ستيك تاون.",
        },
        {
          title: "تنظيم الفعاليات",
          body: "تقدّم الأناقة لتنظيم الفعاليات والأعراس حلولاً مخصّصة بإبداع ودقة وتنفيذ سلس.",
        },
        {
          title: "الإنشاءات والعقارات",
          body: "من خلال العمارة الإسلامية للتجارة والمقاولات ودانية العقارية، نقدّم دعماً عملياً في العقارات والمقاولات والتطوير.",
        },
        {
          title: "خدمات التنظيف",
          body: "تقدّم دانية ميدز حلول تنظيف سكنية وتجارية مع تركيز على الجودة والنظافة والخدمة الموثوقة.",
        },
        {
          title: "حلول التقنية والذكاء الاصطناعي",
          body: "تدعم نكست آي تي جلوبال وفايف نودز للذكاء الاصطناعي ابتكار الأعمال عبر البرمجيات والأنظمة الرقمية والأتمتة والحلول التشغيلية المدعومة بالذكاء الاصطناعي.",
        },
      ],
    },
    leadership: {
      eyebrow: "كلمة القيادة",
      heading: "كلمة من القيادة",
      paragraphs: [
        "في مجموعة NMJ، تعكس مسيرتنا الطموح والمرونة وهدفاً واضحاً لخلق قيمة دائمة في قطر.",
        "يقوم كل قسم في مجموعتنا على التزام بالجودة والثقة والخدمة الهادفة لعملائنا وشركائنا ومجتمعنا.",
        "ومع استمرار نموّنا، نبقى مركّزين على التقدّم والمسؤولية والابتكار والأثر طويل الأمد في كل قطاع نخدمه.",
      ],
    },
    cta: {
      eyebrow: "تواصل معنا",
      heading: "تواصل مع مجموعة NMJ",
      body: "للاستفسارات التجارية أو الشراكات أو المعلومات العامة، تواصل مع مجموعة NMJ في الدوحة، قطر.",
      primary: "تواصل معنا",
      secondary: "عرض جميع الأقسام",
    },
  },
  divisionsPage: {
    hero: {
      headline: "أقسام مجموعة NMJ",
      subhead:
        "حلول أعمال متكاملة عبر الضيافة والعقارات والإنشاءات والفعاليات والخدمات والتقنية والذكاء الاصطناعي في الدوحة، قطر.",
      cta: "تواصل معنا",
    },
    intro: {
      eyebrow: "نظرة عامة",
      heading: "بنية أعمال متنوّعة",
      body: "تعمل مجموعة NMJ عبر أقسام متعددة، يخدم كل منها قطاعاً مميزاً مع الإسهام في معيار مشترك من الجودة والتميّز التشغيلي والنمو طويل الأمد في قطر.",
    },
    divisionWord: "قسم",
    officialWebsite: "الموقع الرسمي",
    contactViaMain: "تواصل عبر صفحة الاتصال",
    future: {
      eyebrow: "نحو المستقبل",
      heading: "استراتيجية التوسّع المستقبلي",
      cards: [
        {
          title: "التوسّع في الضيافة",
          body: "توسيع حضورنا بتجارب راقية عبر المنطقة.",
        },
        {
          title: "التطوير العقاري",
          body: "تطويرات عمرانية مستدامة وأصول تجارية عالية القيمة.",
        },
        {
          title: "النمو في الإنشاءات والفعاليات",
          body: "تنفيذ تقني أقوى للمشاريع والفعاليات المميّزة.",
        },
        {
          title: "دمج التقنية والذكاء الاصطناعي",
          body: "تضمين الأتمتة الذكية في كل وحدة أعمال.",
        },
      ],
    },
    cta: {
      eyebrow: "تواصل معنا",
      heading: "تواصل مع مجموعة NMJ",
      body: "للاستفسارات المتعلقة بالأقسام أو الشراكات أو المعلومات التجارية العامة، تواصل مع مجموعة NMJ في الدوحة، قطر.",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      primary: "استفسر الآن",
      secondary: "راسلنا",
    },
  },
  contact: {
    hero: {
      headline: "تواصل مع مجموعة NMJ",
      subhead:
        "للاستفسارات التجارية أو الشراكات أو المعلومات العامة، تواصل مع مجموعة NMJ في الدوحة، قطر.",
    },
    info: {
      eyebrow: "قنوات مباشرة",
      heading: "تواصل معنا",
      location: "الموقع",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      linkedin: "لينكدإن",
      linkedinValue: "مجموعة NMJ على لينكدإن",
    },
    form: {
      eyebrow: "أرسل رسالة",
      heading: "أرسل لنا رسالة",
      desc: "شارك استفسارك مع فريقنا وسنعاود التواصل معك في أقرب وقت.",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال الرسالة",
      opening: "جارٍ الفتح…",
      success:
        "ينبغي أن يكون برنامج البريد لديك مفتوحاً الآن برسالة جاهزة — أرسلها من هناك وسنتواصل معك.",
    },
    location: {
      eyebrow: "زورونا",
      heading: "موقعنا",
      body: "تتخذ مجموعة NMJ من الدوحة، قطر مقراً لها. زر موقع مكتبنا أو شاهدنا على خرائط جوجل.",
      mapsLink: "عرض مجموعة NMJ على خرائط جوجل والاطلاع على التقييمات",
    },
    finalCta: {
      eyebrow: "تواصل مع فريقنا",
      heading: "تواصل مع فريقنا",
      body: "نرحّب بالاستفسارات التجارية وفرص الشراكة والتواصل العام عبر قنوات الاتصال لدينا.",
      call: "اتصل الآن",
      email: "راسلنا",
    },
  },
  footer: {
    blurb: "مجموعة NMJ مجموعة أعمال متنوّعة مقرها الدوحة، قطر.",
    quickLinks: "روابط سريعة",
    coreSectors: "القطاعات الأساسية",
    contactInfo: "معلومات التواصل",
    location: "الدوحة، قطر",
    rights: "جميع الحقوق محفوظة.",
    tagline: "مجموعة NMJ · منذ ١٩٩١ · الدوحة، قطر",
  },
  mobileMenu: {
    getInTouch: "تواصل معنا",
    contactUs: "تواصل معنا",
    address: "الطابق الثالث، بلازا المفتاح · شارع الريم · الدوحة، قطر",
  },
  login: {
    badge: "مجموعة NMJ · الإدارة",
    title: "تسجيل الدخول",
    subtitle: "الوصول إلى لوحة إدارة المحتوى والمظهر.",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    signingIn: "جارٍ تسجيل الدخول…",
    invalid: "بيانات اعتماد غير صحيحة",
    networkError: "خطأ في الشبكة. حاول مرة أخرى.",
  },
  dashboard: {
    brand: "إدارة NMJ",
    menu: "القائمة",
    close: "إغلاق",
    adminLabel: "مجموعة NMJ · الإدارة",
    dashboard: "لوحة التحكم",
    signedInAs: "مسجّل الدخول باسم",
    logout: "تسجيل الخروج",
    loggingOut: "جارٍ تسجيل الخروج…",
    nav: {
      overview: "نظرة عامة",
      content: "المحتوى",
      jobs: "الوظائف",
      newsroom: "الأخبار",
      theme: "المظهر",
      admins: "المدراء",
      account: "الحساب",
    },
    overview: {
      eyebrow: "نظرة عامة",
      welcome: "مرحباً بعودتك",
      desc: "حدّث محتوى الموقع وبدّل ألوان التمييز وأدر صلاحيات الإدارة من هنا.",
      supabaseError: "تعذّر الوصول إلى Supabase:",
      admins: "المدراء",
      overrides: "تجاوزات المحتوى",
      editableFields: "الحقول القابلة للتحرير",
      status: "الحالة",
      online: "متصل",
      customization: "تخصيص المحتوى",
      customizedOf: "من",
      customizedFields: "حقلاً مخصّصاً",
      quickLinks: [
        { href: "/dashboard/content", label: "تحرير المحتوى", desc: "حدّث العناوين والأوصاف ومعلومات التواصل في جميع الصفحات." },
        { href: "/dashboard/theme", label: "تحرير المظهر", desc: "غيّر اللون الذهبي للوضعين الفاتح والداكن." },
        { href: "/dashboard/admins", label: "إدارة المدراء", desc: "إضافة أو إزالة مستخدمي اللوحة." },
        { href: "/dashboard/account", label: "الحساب", desc: "تغيير كلمة المرور أو تسجيل الخروج." },
      ],
    },
  },
  careers: {
    hero: {
      eyebrow: "انضم إلى فريقنا",
      headline: "ابنِ مسيرتك المهنية في مجموعة NMJ",
      subhead:
        "نبحث عن مواهب متميزة للانضمام إلى فرقنا الديناميكية عبر قطاعات الضيافة والعقارات والإنشاءات والفعاليات والخدمات والتقنية والذكاء الاصطناعي.",
      cta: "استعرض الفرص المتاحة",
    },
    why: {
      eyebrow: "لماذا مجموعة NMJ",
      heading: "لماذا تعمل معنا",
      cards: [
        {
          title: "النمو المهني",
          body: "مسارات مهنية حقيقية داخل مجموعة متنوعة ومتنامية تمتد عبر سبعة قطاعات نشطة.",
        },
        {
          title: "قطاعات متنوعة",
          body: "اكتسب خبرة عابرة للصناعات تشمل الضيافة والإنشاءات والتقنية والذكاء الاصطناعي وأكثر.",
        },
        {
          title: "بيئة عمل تعاونية",
          body: "بيئة عمل تقوم على الاحترام المتبادل والمساءلة المشتركة والتزام راسخ بالتميز.",
        },
        {
          title: "تأثير محلي حقيقي",
          body: "انضم إلى مؤسسات راسخة تخدم سكان قطر ومجتمعها وقطاعها التجاري.",
        },
      ],
    },
    openings: {
      eyebrow: "الفرص المتاحة",
      heading: "الوظائف الحالية",
      intro:
        "نقدم طيفاً واسعاً من الفرص المهنية عبر أقسامنا. أرسل طلبك وسيتواصل معك فريقنا.",
      applyLabel: "تقديم الطلب",
      typeLabel: "نوع الدوام",
      locationLabel: "الموقع",
      divisionLabel: "القسم",
    },
    apply: {
      eyebrow: "ابدأ الآن",
      heading: "أرسل طلبك",
      body: "أرسل سيرتك الذاتية مع ذكر المسمى الوظيفي في سطر الموضوع. يستعرض فريق الموارد البشرية جميع الطلبات ويتواصل مع المرشحين المختارين.",
      cta: "إرسال السيرة الذاتية",
      email: "careers@nmj-group.qa",
      note: "نرحّب بالطلبات من جميع الخلفيات. مجموعة NMJ جهة عمل تكافؤ الفرص.",
    },
  },
  divisions: {
    items: {
      hospitality: {
        name: "الضيافة",
        summary:
          "إدارة فنادق ومطاعم تركّز على تجربة الضيف وجودة الخدمة.",
        intro:
          "إدارة فنادق ومطاعم تركّز على تجربة الضيف ومعايير الخدمة وتقديم ضيافة عالية الجودة في الدوحة.",
        companies: {
          "Sapphire Plaza Hotel":
            "فندق أربع نجوم في الدوحة يوفّر غرفاً ومطاعم وقاعات احتفالات وصالة رياضية ومرافق اجتماعات.",
          "Steak Town":
            "علامة مطاعم ستيك راقية تقدّم لحوماً مشوية مميّزة وتجربة طعام عصرية في الدوحة.",
        } as Record<string, string>,
      },
      "real-estate": {
        name: "العقارات",
        summary:
          "تأجير وبيع العقارات ودعم عقاري عملي للاحتياجات السكنية والتجارية الحديثة.",
        intro:
          "خدمات تأجير وبيع العقارات مصمّمة لدعم الاحتياجات السكنية والتجارية الحديثة.",
        companies: {
          "Dania Real Estate":
            "تأجير وبيع العقارات والاستشارات الاستثمارية ودعم علاقات المستأجرين في الدوحة، قطر.",
        } as Record<string, string>,
      },
      construction: {
        name: "الإنشاءات",
        summary:
          "مقاولات وأعمال تجهيز وتسليم مشاريع تقنية للاحتياجات التجارية والسكنية.",
        intro:
          "دعم إنشائي تجاري وسكني مع تركيز على المقاولات وأعمال التجهيز وتسليم المشاريع.",
        companies: {
          "Al Emara Al Islamiya Trading & Contracting":
            "مقاولات عامة وأعمال داخلية وخدمات ميكانيكية وكهربائية وصحية تدعم احتياجات التطوير العملية في قطر.",
        } as Record<string, string>,
      },
      events: {
        name: "الفعاليات",
        summary:
          "تنظيم الأعراس والفعاليات المؤسسية والاحتفالات الاجتماعية بتنفيذ منظّم.",
        intro:
          "تنظيم الأعراس والفعاليات المؤسسية والاحتفالات الاجتماعية بإبداع وتنسيق وتنفيذ منظّم.",
        companies: {
          "Al Anaqh Events & Wedding Planning":
            "تنظيم أعراس وخدمات فعاليات احترافية للمناسبات الخاصة والمؤسسية في الدوحة.",
        } as Record<string, string>,
      },
      services: {
        name: "الخدمات",
        summary:
          "خدمات دعم سكنية ومكتبية وضيافة تُقدَّم بعمليات يومية موثوقة.",
        intro:
          "خدمات دعم منزلية وتجارية تُقدَّم بفرق مدرّبة ومعايير عالية وخدمة يومية موثوقة.",
        companies: {
          "Dania Maids":
            "تنظيف سكني ومكتبي وتنظيف عميق وخدمات دعم ضيافة في الدوحة، قطر.",
        } as Record<string, string>,
      },
      technology: {
        name: "التقنية",
        summary:
          "أنظمة برمجية وحلول رقمية تحسّن سير العمل وكفاءة الأعمال.",
        intro:
          "تحوّل رقمي وأنظمة برمجية وحلول تقنية للأعمال تحسّن سير العمل والتحكّم والكفاءة التشغيلية.",
        companies: {
          "NexIT Global":
            "إدارة بيانات رقمية وخدمات برمجية وأنظمة وثائق وحلول سير عمل لعمليات الأعمال.",
        } as Record<string, string>,
      },
      ai: {
        name: "الذكاء الاصطناعي",
        summary:
          "أتمتة ذكية وأنظمة معتمدة على الذكاء الاصطناعي للتواصل وسير العمل والعمليات.",
        intro:
          "حلول ذكاء اصطناعي وأتمتة متقدّمة مصمّمة لدعم التواصل وسير العمل والتحليلات وعمليات الأعمال الذكية.",
        companies: {
          "Five Nodes AI":
            "هندسة أنظمة ذكاء اصطناعي وأتمتة سير العمل وأنظمة تواصل ذكية ودعم أعمال ذكي في الدوحة، قطر.",
        } as Record<string, string>,
      },
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
