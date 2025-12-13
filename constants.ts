import { 
  FileText, Home, Users, Building2, Phone, Receipt, Baby, Truck, AlertTriangle,
  MapPin, Landmark, Briefcase, Gavel, Scale, Database, Globe, Droplets,
  HardHat, Trash2, Calculator, Percent, Key, UserCheck, Flame, Heart, 
  PawPrint, Calendar, Store, Signal, Megaphone, Hammer, Wrench, IndianRupee, ShoppingBag,
  History, Search, Filter, Archive, CheckCircle2, Loader2, ArrowRight, X, Clock, HelpCircle
} from 'lucide-react';
import { NavItem } from './types';

// --- Navigation Structure ---
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'About Us', 
    href: '/about',
    subItems: [
      { label: 'History of Jhajjar', href: '/about' },
      { label: 'City Profile', href: '/about' },
      { label: 'Officials Directory', href: '/directory' },
      { label: 'Organizational Chart', href: '/departments' },
    ]
  },
  { 
    label: 'Departments', 
    href: '/departments',
    subItems: [
      { label: 'Engineering Wing', href: '/departments' },
      { label: 'Sanitation Wing', href: '/departments' },
      { label: 'Taxation Wing', href: '/departments' },
      { label: 'Accounts Wing', href: '/departments' }
    ]
  },
  { 
    label: 'Services', 
    href: '/services',
    subItems: [
      { label: 'Property Tax', href: 'https://property.ulbharyana.gov.in/' },
      { label: 'Trade License', href: 'https://online.ulbharyana.gov.in/' },
      { label: 'Fire NOC', href: 'https://fire.ulbharyana.gov.in/' },
      { label: 'Building Plan', href: 'https://haryanabpas.gov.in/BPASP/' },
      { label: 'Download Center', href: '/downloads' } 
    ]
  },
  { label: 'Tenders', href: '/tenders' },
  { label: 'RTI', href: '/rti' },
  { label: 'Contact', href: '/contact' },
];

// --- Icon Mapping for Database Strings ---
export const ICON_MAP: Record<string, any> = {
  FileText, Home, Users, Building2, Phone, Receipt, Baby, Truck, AlertTriangle,
  MapPin, Landmark, Briefcase, Gavel, Scale, Database, Globe, Droplets,
  HardHat, Trash2, Calculator, Percent, Key, UserCheck, Flame, Heart, 
  PawPrint, Calendar, Store, Signal, Megaphone, Hammer, Wrench, IndianRupee, ShoppingBag,
  History, Search, Filter, Archive, CheckCircle2, Loader2, ArrowRight, X, Clock, HelpCircle
};