// Portfolio projects. `filters` map to the filter buttons:
//   "filter1" => Web Design, "filter2" => Web Development, "filter3" => Mobile Apps
// `link` points to the GitHub repo for web projects and to the Google Play
// listing for the published Android apps. `linkLabel` overrides the default
// "View Project" call-to-action.
export const GITHUB_PROFILE = "https://github.com/mafnankhadim";
const PLAY = "https://play.google.com/store/apps/details?id=";

export const portfolioFilters = [
  { label: "ALL Projects", value: "*" },
  { label: "Web Design", value: "filter1" },
  { label: "Web Development", value: "filter2" },
  { label: "Mobile Apps", value: "filter3" },
];

export const projects = [
  {
    title: "BytePOS",
    image: "/images/portfolio/app-bytepos.png",
    category: "Mobile App Development",
    filters: ["filter3"],
    description:
      "A fast, offline-first point-of-sale and billing app for shops, retailers and small businesses. Ring up sales, scan barcodes, print receipts, manage stock and track daily earnings entirely without an internet connection, with optional cloud backup.",
    link: `${PLAY}com.mafnankhadim.bytepos`,
    linkLabel: "Google Play",
  },
  {
    title: "ByteTools",
    image: "/images/portfolio/app-bytetools.png",
    category: "Mobile App Development",
    filters: ["filter3"],
    description:
      "An all-in-one offline document toolkit that scans documents, converts images to PDF and compresses files directly on the device, so everything stays private and works without a network connection.",
    link: `${PLAY}com.mafnankhadim.bytetools`,
    linkLabel: "Google Play",
  },
  {
    title: "POS System (Multiple Store)",
    image: "/images/portfolio/pos.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "A full-stack MERN point-of-sale system for managing products, inventory and sales across multiple stores from a single admin dashboard.",
    link: "https://github.com/mafnankhadim/POS-Multiple-Store",
  },
  {
    title: "Restaurant Reservation (MERN)",
    image: "/images/portfolio/restaurant.png",
    category: "Web Development",
    filters: ["filter2", "filter1"],
    description:
      "A full-stack restaurant reservation platform built with the MERN stack, letting guests check availability and book tables online while staff manage bookings from an admin dashboard. Responsive throughout for a smooth experience on any device.",
    link: "https://github.com/mafnankhadim/Restaurant-Reservation-Using-MERN-Stack",
  },
  {
    title: "Authentication System (MERN)",
    image: "/images/portfolio/auth-mern.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "A complete authentication system built on the MERN stack with secure registration and login, hashed credentials, JWT-based sessions and personalized user pages. Fully responsive, with real-time validation on every field so users know what went wrong before they submit.",
    link: "https://github.com/mafnankhadim/Signin-Signup-Using-MERN-Stack",
  },
  {
    title: "Digital Power",
    image: "/images/portfolio/app-digital-power.png",
    category: "Mobile App Development",
    filters: ["filter3"],
    description:
      "An electricity-services app that brings bill lookup, new-connection applications, complaint registration and net-metering together in one place, with a built-in estimator based on the published tariff schedule.",
    link: `${PLAY}com.gepco.digital`,
    linkLabel: "Google Play",
  },
  {
    title: "University Website (React)",
    image: "/images/portfolio/university.png",
    category: "Web Development",
    filters: ["filter2", "filter1"],
    description:
      "A modern, responsive college and university website built with React, presenting academic programs, departments, admissions and campus life through a clean, component-driven interface with smooth navigation.",
    link: "https://github.com/mafnankhadim/College-University-Website-Using-React.js",
  },
  {
    title: "Gemini AI Clone (React)",
    image: "/images/portfolio/gemini.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "A Gemini-inspired AI chat interface built with React, recreating the conversational UI with prompt input, dynamic responses and a polished, responsive layout that showcases modern front-end architecture.",
    link: "https://github.com/mafnankhadim/Gemini-Clone-Using-React",
  },
  {
    title: "Electricity Bill Calculator",
    image: "/images/portfolio/app-electricity-calculator.png",
    category: "Mobile App Development",
    filters: ["filter3"],
    description:
      "A calculator that estimates a monthly electricity bill before the official one arrives. Enter meter readings and tariff category to get a detailed breakdown of charges, taxes, surcharges and adjustments in seconds.",
    link: `${PLAY}com.electricitybillcalculator.app`,
    linkLabel: "Google Play",
  },
  {
    title: "AJK Electricity Bill",
    image: "/images/portfolio/app-ajk-bill.png",
    category: "Mobile App Development",
    filters: ["filter3"],
    description:
      "A mobile bill viewer for AJK electricity customers, letting users check their bill from home in seconds instead of wrestling with the desktop web portal on a small screen.",
    link: `${PLAY}com.ajkelectricity.ajkedbill`,
    linkLabel: "Google Play",
  },
  {
    title: "Gepco Contractor",
    image: "/images/portfolio/app-gepco-contractor.png",
    category: "Mobile App Development",
    filters: ["filter3"],
    description:
      "A fully offline tool for electricity-supply contractors who prepare connection sheets daily. It converts each added PDF file name into a tracking ID inside a ready-to-use connection sheet with automatic serial numbering.",
    link: `${PLAY}com.gepco.contractor`,
    linkLabel: "Google Play",
  },
  {
    title: "Test Cracker",
    image: "/images/portfolio/testcracker.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "A quiz and test-preparation web app where users practice multiple-choice questions with instant feedback, timed challenges and scoring to sharpen their knowledge.",
    link: "https://github.com/mafnankhadim/Quiz-Game",
  },
  {
    title: "Smart Barq",
    image: "/images/portfolio/smartbarq.png",
    category: "Web Design",
    filters: ["filter1"],
    description:
      "A smart electricity-utility web interface for monitoring usage and presenting billing information through a clean, responsive dashboard layout.",
    link: GITHUB_PROFILE,
  },
  {
    title: "Crypto Update",
    image: "/images/portfolio/crypto.png",
    category: "Web Design",
    filters: ["filter1", "filter2"],
    description:
      "A cryptocurrency website that fetches and displays live coin prices from a public API, giving users real-time market insights at a glance.",
    link: "https://github.com/mafnankhadim/Cryptocurrency-Website",
  },
  {
    title: "Tax Consultant",
    image: "/images/portfolio/textconsultant.png",
    category: "Web Design",
    filters: ["filter2", "filter1"],
    description:
      "A professional landing site for a tax-consultancy firm, presenting services, expertise and contact options in a modern, responsive layout.",
    link: GITHUB_PROFILE,
  },
  {
    title: "Code Crafter",
    image: "/images/portfolio/codecrafter.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "An agency-style website for a web-development studio, showcasing services, a project portfolio and a clean contact workflow.",
    link: GITHUB_PROFILE,
  },
  {
    title: "Email Subscription",
    image: "/images/portfolio/mail.png",
    category: "Web Design",
    filters: ["filter1"],
    description:
      "A working email subscription form that captures subscriber emails and stores them in Google Sheets for easy newsletter management.",
    link: "https://github.com/mafnankhadim/Working-Email-Subscription-Form-With-Google-Sheets",
  },
  {
    title: "Book Shop",
    image: "/images/portfolio/bookshop.png",
    category: "Web Development",
    filters: ["filter2", "filter1"],
    description:
      "An online bookshop interface for browsing and purchasing books, with a clean catalogue and an intuitive shopping experience.",
    link: "https://github.com/mafnankhadim/Book-Shop",
  },
  {
    title: "BMI Calculator",
    image: "/images/portfolio/bmi.png",
    category: "Web Design",
    filters: ["filter1"],
    description:
      "A BMI calculator that computes body mass index from height and weight inputs, helping users track their fitness goals.",
    link: "https://github.com/mafnankhadim/BMI-Calculator",
  },
  {
    title: "POS System (Docker Admin)",
    image: "/images/portfolio/pos-docker.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "A containerized point-of-sale admin panel deployed with Docker, delivering a fast, static dashboard to manage products, sales and store operations. Engineered for reliable, reproducible deployment and a smooth day-to-day experience for cashiers and administrators.",
    link: "https://github.com/mafnankhadim/POS-Docker-Static-Admin",
  },
  {
    title: "Text to Query",
    image: "/images/portfolio/text2query.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "A Python tool that turns plain-English questions into database queries, bridging natural language and SQL so users can pull data without writing code. A practical demonstration of language-to-query automation.",
    link: "https://github.com/mafnankhadim/text2query",
  },
  {
    title: "PDF to Excel Converter",
    image: "/images/portfolio/pdf2excel.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "A conversion tool that extracts tabular data from PDF documents and exports it into clean, structured Excel spreadsheets, automating tedious manual data entry and accelerating document processing.",
    link: "https://github.com/mafnankhadim/pdf2excel-sunshine",
  },
  {
    title: "Bill Detection",
    image: "/images/portfolio/bill-detection.png",
    category: "Web Development",
    filters: ["filter2"],
    description:
      "An intelligent bill and invoice detection tool that reads uploaded documents to automatically identify and extract key billing details, streamlining record-keeping and reducing manual data entry.",
    link: "https://github.com/mafnankhadim/bill-detection",
  },
  {
    title: "Image Enhancer & BG Remover",
    image: "/images/portfolio/image-enhancer.png",
    category: "Web Design",
    filters: ["filter1", "filter2"],
    description:
      "An image-processing web tool that enhances photo quality and instantly removes backgrounds, giving users clean, professional images ready for design and e-commerce use.",
    link: "https://github.com/mafnankhadim/image-enhancer",
  },
];
