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
