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

export const projects: { title: string; desc: string; href?: string; award?: string }[] = [
  {
    title: "Supersede",
    desc: "Decision provenance for AI agents: finds answers built on outdated evidence and proves it by replay.",
    href: "https://github.com/hemanthsrivathsav/agentic_rca",
  },
  {
    title: "EcoCode",
    desc: "Shows the carbon impact of every pull request and commit.",
    href: "https://github.com/hemanthsrivathsav/git_ecoCode/tree/master",
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
  "AWS",
  "PySpark",
  "FastAPI",
  "Kubernetes",
  "React",
  "TypeScript",
  "Node.js",
  "TailwindCSS",
  "Docker",
  "PostgreSQL",
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
