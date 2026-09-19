import type { LucideIcon } from "lucide-react";
import { Award, Briefcase, FileText, FolderOpen, Home, Mail, User } from "lucide-react";

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
  { label: "Resume", path: "/resume", icon: FileText },
  { label: "Contact", path: "/contact", icon: Mail },
];
