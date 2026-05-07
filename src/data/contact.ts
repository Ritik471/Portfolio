import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin } from "lucide-react";

export interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

export const contactInfo: ContactDetail[] = [
  {
    icon: Mail,
    label: "Email",
    value: "ritikshah1206@gmail.com",
    color: "text-emerald-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nagpur, India",
    color: "text-emerald-400",
  },
  {
    icon: Clock,
    label: "Timezone",
    value: "IST (GMT +5:30)",
    color: "text-emerald-400",
  },
];

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export const socials: SocialLink[] = [
  {
    icon: "line-md:github-loop",
    label: "GitHub",
    href: "https://github.com/Ritik471",
  },
  {
    icon: "line-md:linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ritikshah2000/",
  },
  {
    icon: "logos:whatsapp-icon",
    label: "WhatsApp",
    href: "https://wa.me/917888257529",
  },
];
