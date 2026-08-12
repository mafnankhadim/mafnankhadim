// Static content for the navigation, services, skills and contact details.

export const navLinks = [
  { label: "Home", target: "tcd-banner" },
  { label: "About", target: "tcd-about" },
  { label: "Services", target: "tcd-services" },
  { label: "Works", target: "tcd-portfolio" },
  { label: "Contact", target: "tcd-contact" },
];

// Rotating job titles in the banner headline (see components/Banner.jsx).
export const bannerRoles = [
  "MERN Stack Developer",
  "Software Developer",
  "Android App Developer",
  "Web Designer",
];

// CV lives on Google Drive rather than in public/, so it can be swapped
// without redeploying the site.
export const CV_URL =
  "https://drive.google.com/file/d/1RCVgFINzjqf5Pp9PXJSNz4v08mPFOMao/view?usp=sharing";

// Target of the header "Hire Me" button. Public seller profile — not the
// /seller_dashboard URL, which only resolves for a logged-in seller.
export const FIVERR_URL = "https://www.fiverr.com/mafnan_dev";

export const services = [
  {
    icon: "fa fa-globe",
    title: "Web Design",
    description:
      "Designing clean, responsive websites with HTML, CSS and Bootstrap that read well on every screen size, from phones to desktops.",
  },
  {
    icon: "fa fa-briefcase",
    title: "Web Development",
    description:
      "Building full-stack web applications with React.js, Node.js and the MERN stack, with a focus on performance and scalability.",
  },
  {
    icon: "fa fa-mobile",
    title: "Mobile App Development",
    description:
      "Building and publishing offline-first Android apps on Google Play, from point-of-sale and billing systems to document and utility tools.",
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
