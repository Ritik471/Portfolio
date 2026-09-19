export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  link: string;
  credentialId?: string;
  verified?: boolean;
  image: string;
  description: string;
  icon: string;
  glow: string;
  accent: string;
}

export const certificates: Certificate[] = [
  {
    title: "Flutter and Dart Complete Guide",
    issuer: "Udemy",
    date: "2023",
    link: "https://www.linkedin.com/in/ritikshah2000/details/certifications/",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
    description:
      "Comprehensive course in Flutter and Dart, covering fundamental concepts essential for Flutter app development.",
    icon: "logos:flutter",
    glow: "group-hover:border-blue-500/30",
    accent: "text-blue-400",
  },
  {
    title: "RealWorld Projects with Flutter",
    issuer: "Infosys Springboard",
    date: "2023",
    link: "https://www.linkedin.com/in/ritikshah2000/details/certifications/",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072",
    description:
      "Successfully completing a course in Flutter and Dart by Infosys Springboard, which taught to develop Real World Projects.",
    icon: "logos:flutter",
    glow: "group-hover:border-orange-500/30",
    accent: "text-orange-400",
  },
  {
    title: "Hackoverflow 1.0",
    issuer: "National-Level Hackathon",
    date: "2023",
    link: "https://www.linkedin.com/in/ritikshah2000/details/certifications/",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070",
    description:
      "Certified for participation in a national-level hackathon, competing against students nationwide.",
    icon: "logos:google-cloud",
    glow: "group-hover:border-blue-400/30",
    accent: "text-blue-300",
  },
];
