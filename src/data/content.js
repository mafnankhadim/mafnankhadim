// Static content for the navigation, services, skills and contact details.

export const navLinks = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Services", target: "services" },
  { label: "Work", target: "work" },
  { label: "Contact", target: "contact" },
];

// Rotating job titles in the banner headline (see components/Banner.jsx).
export const bannerRoles = [
  "MERN Stack Developer",
  "Software Developer",
  "Android App Developer",
  "Web Designer",
];

// Sub-headline under the rotating roles in the banner.
export const bannerLead =
  "I build production React and Node.js applications for government and " +
  "healthcare clients, and publish offline-first Android apps on Google Play.";

// CV lives on Google Drive rather than in public/, so it can be swapped
// without redeploying the site.
export const CV_URL =
  "https://drive.google.com/file/d/1RCVgFINzjqf5Pp9PXJSNz4v08mPFOMao/view?usp=sharing";

// Target of the header "Hire Me" button. Public seller profile — not the
// /seller_dashboard URL, which only resolves for a logged-in seller.
export const FIVERR_URL = "https://www.fiverr.com/mafnan_dev";

// `points` are the concrete deliverables listed on each service card — they
// keep the cards from being three sentences floating in empty space.
export const services = [
  {
    icon: "fa fa-globe",
    title: "Web Design",
    description:
      "Clean, responsive interfaces that read well on every screen size, from phones to desktops.",
    points: [
      "Responsive layouts",
      "Reusable component libraries",
      "Accessible, semantic markup",
    ],
  },
  {
    icon: "fa fa-briefcase",
    title: "Web Development",
    description:
      "Full-stack applications on the MERN stack, built for performance and for the team that maintains them.",
    points: [
      "React & Redux front-ends",
      "Node/Express REST APIs",
      "MongoDB schema design",
    ],
  },
  {
    icon: "fa fa-mobile",
    title: "Mobile App Development",
    description:
      "Offline-first Android apps, from point-of-sale and billing systems to everyday utility tools.",
    points: [
      "Offline-first data sync",
      "Google Play publishing",
      "React Native & native Android",
    ],
  },
];

// Kept deliberately short: eight bars read as a summary, a dozen reads as a
// wall. Overlapping entries (Bootstrap, Express.js, "MERN Stack") are covered
// by the paragraph above the bars instead.
export const skills = [
  { label: "HTML5 + CSS3", value: 95 },
  { label: "JavaScript", value: 90 },
  { label: "TypeScript", value: 85 },
  { label: "React.js", value: 92 },
  { label: "Redux Toolkit", value: 88 },
  { label: "Node.js", value: 88 },
  { label: "MongoDB", value: 87 },
  { label: "React Native", value: 80 },
];

// Grouped for the Skills section. Every entry is evidenced by the bio, the
// roles below or a shipped project in portfolio.js — nothing aspirational.
export const techGroups = [
  {
    title: "Frontend",
    icon: "fa fa-code",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux Toolkit",
      "React Query",
      "HTML5 & CSS3",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    icon: "fa fa-server",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API Design",
      "JWT Authentication",
      "Mongoose",
    ],
  },
  {
    title: "Mobile",
    icon: "fa fa-mobile",
    items: [
      "React Native",
      "Android (Google Play)",
      "Offline-first Sync",
      "SQLite / Local Storage",
    ],
  },
  {
    title: "Workflow",
    icon: "fa fa-cogs",
    items: [
      "Git & GitHub",
      "Agile / Scrum",
      "Responsive UI",
      "Component Architecture",
      "Vercel Deployment",
    ],
  },
];

// Short marks for the scrolling strip under the hero.
export const marqueeItems = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "TypeScript",
  "Next.js",
  "Redux Toolkit",
  "React Native",
  "REST APIs",
  "Android",
];

export const experience = [
  {
    role: "Software Developer",
    company: "DevBrains Lahore",
    location: "Lahore, Pakistan",
    period: "Nov 2025 — Present",
    current: true,
    description:
      "Building core modules (patient intake, appointment scheduling and role-based dashboards) in a production medical web portal using React.js and TypeScript with responsive, accessible UIs.",
    highlights: [
      "Integrate REST APIs with React Query for fetching, caching and error states",
      "Own authentication flows and form validation through a shared hooks layer",
      "Maintain a reusable library of forms, modals and data tables used across the product",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "PITC, Ministry of Energy (Power Division)",
    location: "Lahore, Pakistan",
    period: "Dec 2023 — Nov 2025",
    description:
      "Shipped consumer-facing modules in the power portal used by DISCOs — bill payment, installments, complaint registration and meter change — built with React.js and Redux.",
    highlights: [
      "Delivered a multi-step approval UI for bill-correction and meter-reading workflows",
      "Built the full-stack Bill Detection module end to end with React and Node/Express",
      "Owned schema design, REST endpoint authentication and deployment readiness",
    ],
  },
  {
    role: "Intern",
    company: "AJK Electricity Department",
    location: "Muzaffarabad, AJK",
    period: "Jul 2023 — Aug 2023",
    description:
      "Supported departmental reporting: data analysis in Excel, office communications in Word and presentations for departmental initiatives.",
    highlights: [],
  },
];

export const education = [
  {
    degree: "BS. Computer Science",
    school: "Mirpur University of Science and Technology, AJK",
    period: "2019 — 2023",
    description:
      "Comprehensive grounding in software development, algorithms, databases and web technologies, with hands-on project work across modern languages and frameworks.",
  },
];

export const contactInfo = [
  {
    icon: "fa fa-map-marker",
    title: "Location",
    value: "Lahore, Punjab, Pakistan",
  },
  {
    icon: "fa fa-envelope-o",
    title: "Email Address",
    value: "mafnankhadim74@gmail.com",
    href: "mailto:mafnankhadim74@gmail.com",
  },
  {
    icon: "fa fa-tablet",
    title: "Phone Number",
    value: "+92 333 3395115",
    href: "https://wa.me/923333395115",
    external: true,
  },
];

// Font Awesome 4.7 (vendored in public/css) predates the Fiverr brand icon,
// so that one entry carries `svgPath` instead of `icon` — a 24x24 path from
// Simple Icons, rendered inline with fill="currentColor" so it inherits the
// same colour and hover states as the font glyphs.
const FIVERR_ICON_PATH =
  "M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z";

// `label` is used for the accessible name on the icon-only links.
export const socialLinks = [
  {
    icon: "fa fa-github",
    label: "GitHub",
    href: "https://github.com/mafnankhadim",
  },
  {
    icon: "fa fa-linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/m-afnan-khadim/",
  },
  {
    svgPath: FIVERR_ICON_PATH,
    label: "Fiverr",
    href: FIVERR_URL,
  },
  {
    icon: "fa fa-facebook",
    label: "Facebook",
    href: "https://www.facebook.com/afnan.khadim630/",
  },
  {
    icon: "fa fa-twitter",
    label: "X",
    href: "https://x.com/mafnankhadim",
  },
  {
    icon: "fa fa-instagram",
    label: "Instagram",
    href: "https://www.instagram.com/m._.afnan._.khadim/",
  },
];

// Footer "Find me on" column. Replaces the template's placeholder Support
// links (Help Center / Partner Program / Privacy Policy), which went nowhere.
export const footerLinks = [
  { label: "GitHub", href: "https://github.com/mafnankhadim" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/m-afnan-khadim/" },
  {
    label: "Google Play",
    href: "https://play.google.com/store/apps/dev?id=6481132732585787649",
  },
];

// Web3Forms access key (public-by-design; lives in the original markup).
export const WEB3FORMS_ACCESS_KEY = "adf49c41-3714-4e66-b74a-baa0e4963143";
