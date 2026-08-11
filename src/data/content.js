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
      "Designing clean, responsive, and user-friendly websites using HTML, CSS, and Bootstrap for seamless experience across devices.",
  },
  {
    icon: "fa fa-briefcase",
    title: "Web Development",
    description:
      "Building full-stack web applications leveraging React.js, Node.js, and the MERN stack with focus on performance and scalability.",
  },
  {
    icon: "fa fa-mobile",
    title: "Mobile App Development",
    description:
      "Building and publishing offline-first Android apps on Google Play, from point-of-sale and billing systems to document and utility tools.",
  },
];

export const skills = [
  { label: "HTML5 + CSS3", value: 92 },
  { label: "Bootstrap", value: 88 },
  { label: "JavaScript", value: 90 },
  { label: "React.js", value: 85 },
  { label: "Node.js", value: 80 },
  { label: "MERN Stack", value: 82 },
];

export const contactInfo = [
  {
    icon: "fa fa-map-marker",
    title: "Our Address",
    value: "Lahore, Punjab Pakistan",
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

export const socialLinks = [
  { icon: "fa fa-facebook", href: "https://www.facebook.com/afnan.khadim630/" },
  { icon: "fa fa-twitter", href: "https://x.com/mafnankhadim" },
  { icon: "fa fa-linkedin", href: "https://www.linkedin.com/in/m-afnan-khadim/" },
  { icon: "fa fa-instagram", href: "https://www.instagram.com/m._.afnan._.khadim/" },
];

// Web3Forms access key (public-by-design; lives in the original markup).
export const WEB3FORMS_ACCESS_KEY = "adf49c41-3714-4e66-b74a-baa0e4963143";
