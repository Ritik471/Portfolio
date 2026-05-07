import type { LucideIcon } from "lucide-react";
import { Award, Briefcase, FolderOpen, Home, Mail, User } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: User },
  { label: "Projects", path: "/projects", icon: FolderOpen },
  { label: "Experience", path: "/experience", icon: Briefcase },
  { label: "Certificates", path: "/certificates", icon: Award },
  { label: "Contact", path: "/contact", icon: Mail },
];
