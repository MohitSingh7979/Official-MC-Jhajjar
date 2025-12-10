import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  link: string; // URL
  color: string;
  accent: string;
  documents: string[];
  timeframe: string;
  fees: string;
  isExternal?: boolean;
  buttonLabel?: string;
  category?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  link: string;
  summary?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: string;
}

export interface Official {
  id: string;
  name: string;
  designation: string;
  image: string;
  phone?: string;
  email?: string;
  category: 'National' | 'State' | 'District' | 'Municipal';
  priority?: number;
  message?: string;
}

export interface Department {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  incharge: string;
  designation: string;
  employees: string[];
  acts: string[];
}