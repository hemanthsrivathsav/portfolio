import type { Slide } from "../components/Carousel";

export const profile = {
  name: "N. Hemanth Srivathsav",
  tagline: "Software Engineer @ JPMorgan Chase & Co. • Practical ML • Cloud & AWS fan.",
  photo: "/profile.webp",
  github: "https://github.com/hemanthsrivathsav",
  linkedin: "https://www.linkedin.com/in/n-hemanth-srivathsav/",
};

export const about =
  "I build data-driven, delightful experiences. Recently: Supersede, a tool that proves why an AI agent's answer was wrong; optimized Kubernetes jobs for heavy file conversions; shipped a React Native spend tracker.";

export type Project = {
  title: string;
  desc: string;
  /** Source code. */
  repo?: string;
  /** Deployed app. When set, clicking the project card opens this instead of the repo. */
  live?: string;
  award?: string;
  featured?: boolean;
  subtitle?: string;
  details?: string[];
  technologies?: string[];
};

export const projects: Project[] = [
  {
    title: "Nexar",
    subtitle: "Agentic Conversational Analytics Platform",
    featured: true,
    desc: "Developed a production-grade AI analytics platform that turns natural-language questions about Databricks data into validated insights, visualizations, and data stories.",
    details: [
      "Integrated a React/Flask UI with Python-based Communicator and SmartSDK microservices.",
      "Built workflow-based multi-agent orchestration using Azure Models for intent resolution, semantic clarification, query enhancement, visualization, and data storytelling.",
      "Connected enhanced requests to Databricks Genie while maintaining conversation and per-tab session context.",
      "Implemented governed use-case approvals and certified SQL reuse using Delta tables and Databricks Statement Execution APIs.",
      "Containerized and deployed services on AWS ECS behind an Application Load Balancer.",
      "Supported delivery quality through Jenkins/Jules CI/CD, pytest, Vitest, SonarQube, logging, health checks, and service-level test coverage.",
    ],
    technologies: [
      "Python", "Flask", "React", "TypeScript", "Azure Models", "LLMs",
      "Databricks Genie", "Delta Lake", "AWS ECS", "Docker", "Jenkins",
      "Jules", "pytest", "Vitest", "SonarQube",
    ],
  },
  {
    title: "Supersede",
    desc: "Decision provenance for AI agents: finds answers built on outdated evidence and proves it by replay.",
    repo: "https://github.com/hemanthsrivathsav/agentic_rca",
  },
  {
    title: "EcoCode",
    desc: "Shows the carbon impact of every pull request and commit.",
    repo: "https://github.com/hemanthsrivathsav/git_ecoCode/tree/master",
    award: "1st place · JPMC Tech Sustainability Hackathon",
  },
  { title: "Gamified AWS Learner", desc: "Learn AWS via quests and badges.", award: "2nd place · Inseption Hackathon" },
  { title: "Spend Sense (RN)", desc: "Reads SMS to categorize spends." },
];

export const highlights = [
  "🌟 \"Stars of the Future\" Award, JPMorgan Chase",
  "🏆 1st Place, JPMC Tech Sustainability Hackathon",
  "🥈 2nd Place, JPMC Tech Sustainability Hackathon (AI Edition)",
  "🥈 2nd Place, Inseption Hackathon",
  "🏆 Won Sepathon @JPMC",
  "📄 Published in Springer LNNS: YOLOv8 small-object (weapon) detection",
  "🎓 B.Tech CSE (AI&ML), KL University",
];

/**
 * LinkedIn posts shown (auto-scrolling) in the Highlights section. To add one: open the post on LinkedIn,
 * choose "…" → "Embed this post", and copy the `src` URL from the iframe code it gives you. Only public
 * posts offer this option. If this list is empty, the section shows the highlights above as cards.
 */
export type LinkedInPost = {
  embedUrl: `https://www.linkedin.com/embed/feed/update/${string}`;
  /** Short description for screen readers, e.g. "Winning the JPMC Tech Sustainability Hackathon". */
  title: string;
  /** Iframe height from LinkedIn's embed code; posts with images or video need more room. */
  height?: number;
};

// Newest first.
export const linkedinPosts: LinkedInPost[] = [
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7514673641608007680?collapsed=1",
    title: "Receiving the \"Stars of the Future\" award at JPMorgan Chase",
    height: 628,
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7490764158897086464?collapsed=1",
    title: "Mentoring with Generation Tech",
    height: 628,
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7465335466440003584?collapsed=1",
    title: "Paper on YOLOv8 small-object (weapon) detection published by Springer",
    height: 737,
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7399076524508766208?collapsed=1",
    title: "JPMC Tech Sustainability 2.0 with AI Hackathon",
    height: 628,
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7292428288034062336?collapsed=1",
    title: "2nd place at the JPMorgan Chase InSeption Hackathon in Hyderabad",
    height: 628,
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7275848425676386304?collapsed=1",
    title: "Attending the conference for the weapon-detection paper",
    height: 628,
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7261075061850218496?collapsed=1",
    title: "1st place at the JPMC Tech Sustainability Hackathon",
    height: 628,
  },
];

export const paper = {
  title: "Deep Learning Based Small Object (Weapon) Detection in Complex Scene Using YOLO-V8",
  href: "https://link.springer.com/chapter/10.1007/978-981-95-0497-8_23",
  venue: "Springer · Lecture Notes in Networks and Systems · 2026",
  coAuthors: "with Vegesh Boppana et al.",
  summary:
    "Detects small weapons such as handguns in complex surveillance scenes with YOLOv8 Nano, trained on a custom 16,000-image dataset covering blur, occlusion and weapon-like objects.",
};

export const skills = [
  "Python",
  "SQL",
  "Databricks",
  "Databricks Genie",
  "Delta Lake",
  "Azure Models",
  "LLMs",
  "AWS",
  "AWS ECS",
  "Application Load Balancer",
  "PySpark",
  "Flask",
  "FastAPI",
  "Kubernetes",
  "React",
  "TypeScript",
  "Node.js",
  "TailwindCSS",
  "Docker",
  "PostgreSQL",
  "Jenkins",
  "Jules",
  "CI/CD",
  "pytest",
  "Vitest",
  "SonarQube",
  "Git",
];

export const now = ["Learning: AWS • Kubernetes", "Building: RN spending tracker", "Reading: Systems Design"];

export const certifications: Slide[] = [
  {
    src: "https://images.credly.com/size/340x340/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png",
    href: "https://www.credly.com/badges/2b944fe7-d5d2-4105-a214-ce6b74a0e728",
    alt: "AWS Certified AI Practitioner (Credly badge)",
  },
  {
    src: "https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/84890241",
    href: "https://www.credential.net/27880ce5-bd18-47db-9245-2f9f98de7ccb#acc.4G30f6lb",
    alt: "TensorFlow Developer Certificate",
  },
  { alt: "Coming soon" },
];

export const experiments: Slide[] = [
  { src: "/experiments/portfolio-v1.webp", href: "https://hemanthsrivathsav.vercel.app/", alt: "Earlier portfolio site" },
  { src: "/experiments/spline-scene.webp", href: "https://my.spline.design/untitled-0741ae787374a9c52a8ebcec7f96d867/", alt: "Spline 3D scene" },
  { src: "/experiments/squad-shuffle.webp", href: "https://squad-shuffle.vercel.app/", alt: "Squad Shuffle: random team picker" },
];
