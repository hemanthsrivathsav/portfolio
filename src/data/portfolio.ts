import type { Slide } from "../components/Carousel";

export const profile = {
  name: "N. Hemanth Srivathsav",
  tagline: "Software Engineer @ JPMorgan Chase & Co. • Practical ML • Cloud & AWS fan.",
  photo: "/profile.webp",
  github: "https://github.com/hemanthsrivathsav",
  linkedin: "https://www.linkedin.com/in/n-hemanth-srivathsav/",
};

export const about =
  "I build data-driven, delightful experiences. Recently: gamified AWS learning, optimized Kubernetes jobs for heavy file conversions, shipped a React Native spend tracker.";

export const projects: { title: string; desc: string; href?: string }[] = [
  { title: "Gamified AWS Learner", desc: "Learn AWS via quests and badges." },
  { title: "Spend Sense (RN)", desc: "Reads SMS to categorize spends." },
  { title: "Carbon-Smart Coding", desc: "Lower energy footprint of code." },
];

export const highlights = [
  "🏆 Won Tech_Sustainability Hackathon @JPMC",
  "🏆 Won Sepathon @JPMC",
  "🎓 B.Tech CSE (AI&ML), KL University",
  "☁️ AWS Cloud Practitioner prep",
];

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

export const now = ["Learning: AWS • K8- kubernetes", "Building: RN spending tracker", "Reading: Systems Design"];

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
];
