import { 
  FileText, Home, Users, Building2, Phone, Receipt, Baby, Truck, AlertTriangle,
  MapPin, Landmark, Briefcase, Gavel, Scale, Database, Globe, Droplets,
  HardHat, Trash2, Calculator, Percent, Key, UserCheck, Flame, Heart, 
  PawPrint, Calendar, Store, Signal, Megaphone, Hammer, Wrench, IndianRupee, ShoppingBag
} from 'lucide-react';
import { NavItem, Service, NewsItem, Stat, Official, Department } from './types';

// --- Navigation ---
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { 
    label: 'About Us', 
    href: '#about',
    subItems: [
      { label: 'History of Jhajjar', href: '#history' },
      { label: 'City Profile', href: '#profile' },
      { label: 'Officials Directory', href: '#directory' }, // Added Route
      { label: 'Organizational Chart', href: '#org' },
    ]
  },
  { 
    label: 'Departments', 
    href: '#departments',
    subItems: [
      { label: 'Engineering Wing', href: '#engineering' },
      { label: 'Sanitation Wing', href: '#sanitation' },
      { label: 'Taxation Wing', href: '#tax' },
      { label: 'Accounts Wing', href: '#accounts' }
    ]
  },
  { 
    label: 'Services', 
    href: '#services',
    subItems: [
      { label: 'Property Tax', href: 'https://property.ulbharyana.gov.in/' },
      { label: 'Trade License', href: 'https://online.ulbharyana.gov.in/' },
      { label: 'Fire NOC', href: 'https://fire.ulbharyana.gov.in/' },
      { label: 'Building Plan', href: 'https://haryanabpas.gov.in/BPASP/' }
    ]
  },
  { label: 'Tenders', href: '#tenders' },
  { label: 'RTI', href: '#rti' },
  { label: 'Contact', href: '#contact' },
];

// --- Services (Strict Color Palette Applied) ---
export const SERVICES: Service[] = [
  {
    id: 's1',
    title: "Property Tax",
    description: "Pay property tax, view bills, and get receipts via DULB Portal.",
    icon: Home,
    link: "https://property.ulbharyana.gov.in/",
    color: "bg-brand-blue",
    accent: "text-brand-blue",
    documents: ['Property ID', 'Mobile Number'],
    timeframe: 'Instant',
    fees: 'As per Assessment',
    isExternal: true,
    buttonLabel: "Pay Tax",
    category: "Finance"
  },
  {
    id: 's18',
    title: "Development Charges",
    description: "Pay outstanding development charges and municipal dues.",
    icon: IndianRupee,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-blue",
    accent: "text-brand-blue",
    documents: ['Property ID', 'Demand Notice'],
    timeframe: 'Instant',
    fees: 'As per Demand',
    isExternal: true,
    buttonLabel: "Pay Now",
    category: "Finance"
  },
  {
    id: 's4',
    title: "Water & Sewerage",
    description: "Apply for new connections and pay bills via ULB Portal.",
    icon: Droplets,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-blue",
    accent: "text-brand-blue",
    documents: ['ID Proof', 'Property Tax Receipt'],
    timeframe: '15 Days',
    fees: 'Connection Charges',
    isExternal: true,
    buttonLabel: "ULB Portal",
    category: "Utilities"
  },
  {
    id: 's5',
    title: "Trade License",
    description: "Apply for new trade license or renew existing ones.",
    icon: Receipt,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-green",
    accent: "text-brand-green",
    documents: ['Rent Agreement', 'ID Proof', 'Fire NOC'],
    timeframe: '15 Days',
    fees: 'Category Based',
    isExternal: true, 
    buttonLabel: "ULB Portal",
    category: "Commercial"
  },
  {
    id: 's17',
    title: "Street Vendor Reg.",
    description: "Registration and licensing for street vendors (Rehari/Phadi).",
    icon: ShoppingBag,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-orange",
    accent: "text-brand-orange",
    documents: ['Aadhar Card', 'Bank Account'],
    timeframe: '30 Days',
    fees: '₹1000/Year',
    isExternal: true,
    buttonLabel: "Register",
    category: "Commercial"
  },
  {
    id: 's7',
    title: "Fire NOC",
    description: "Apply for provisional or final Fire No Objection Certificate.",
    icon: Flame,
    link: "https://fire.ulbharyana.gov.in/",
    color: "bg-brand-red",
    accent: "text-brand-red",
    documents: ['Building Plan', 'Owner ID'],
    timeframe: '15 Days',
    fees: 'Area Based',
    isExternal: true,
    buttonLabel: "Fire Portal",
    category: "Safety"
  },
  {
    id: 's8',
    title: "Marriage Registration",
    description: "Register marriage and obtain legal certificate.",
    icon: Heart,
    link: "https://shaadi.edisha.gov.in/",
    color: "bg-brand-red",
    accent: "text-brand-red",
    documents: ['Joint Photo', 'ID Proofs', 'Wedding Card'],
    timeframe: 'Working Days',
    fees: '₹500+',
    isExternal: true,
    buttonLabel: "Register",
    category: "Personal"
  },
  {
    id: 's6',
    title: "Birth & Death",
    description: "Issues official certificates and records.",
    icon: Baby,
    link: "https://crsorgi.gov.in/web/index.php/auth/login",
    color: "bg-brand-yellow",
    accent: "text-brand-yellow",
    documents: ['Discharge Slip', 'ID Proofs'],
    timeframe: '14 Days',
    fees: '₹50+',
    isExternal: true, 
    buttonLabel: "CRS Portal",
    category: "General"
  },
  {
    id: 's9',
    title: "Dog Registration",
    description: "Apply for pet dog registration and license.",
    icon: PawPrint,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-yellow",
    accent: "text-brand-yellow",
    documents: ['Vaccination Card', 'Photo'],
    timeframe: '7 Days',
    fees: '₹50/Year',
    isExternal: true,
    buttonLabel: "Apply",
    category: "Health"
  },
  {
    id: 's10',
    title: "Community Booking",
    description: "Book municipal community centers for personal/public events.",
    icon: Calendar,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-blue",
    accent: "text-brand-blue",
    documents: ['ID Proof', 'Event Details'],
    timeframe: 'Immediate',
    fees: 'Per Day Rates',
    isExternal: true,
    buttonLabel: "Book Now",
    category: "Community"
  },
  {
    id: 's3',
    title: "Building Plan",
    description: "Online Building Plan Approval System (OBPAS).",
    icon: Building2,
    link: "https://haryanabpas.gov.in/BPASP/",
    color: "bg-brand-orange",
    accent: "text-brand-orange",
    documents: ['Architectural Drawings', 'Ownership Proof'],
    timeframe: '30 Days',
    fees: 'Per Sq. Yd.',
    isExternal: true,
    buttonLabel: "Access OBPAS",
    category: "Construction"
  },
  {
    id: 's13',
    title: "Advertising Permit",
    description: "Apply for permission to display advertisements, banners, or hoardings.",
    icon: Megaphone,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-blue",
    accent: "text-brand-blue",
    documents: ['Site Plan', 'Content Details'],
    timeframe: '15 Days',
    fees: 'Area Based',
    isExternal: true,
    buttonLabel: "Apply",
    category: "Commercial"
  },
  {
    id: 's14',
    title: "Road Cutting",
    description: "Permission for road cutting to lay underground cables or pipes.",
    icon: Hammer,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-orange",
    accent: "text-brand-orange",
    documents: ['Route Map', 'Purpose'],
    timeframe: '7 Days',
    fees: 'Per Meter',
    isExternal: true,
    buttonLabel: "Apply",
    category: "Construction"
  },
  {
    id: 's15',
    title: "Septic Tank Cleaning",
    description: "Book municipal suction machines for septic tank cleaning.",
    icon: Wrench,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-green",
    accent: "text-brand-green",
    documents: ['ID Proof', 'Address'],
    timeframe: '24-48 Hours',
    fees: 'Fixed Rate',
    isExternal: true,
    buttonLabel: "Book Now",
    category: "Sanitation"
  },
  {
    id: 's16',
    title: "Mobile Tower NOC",
    description: "Application for installation of communication towers.",
    icon: Signal,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-blue",
    accent: "text-brand-blue",
    documents: ['Site Plan', 'Structural Safety'],
    timeframe: '30 Days',
    fees: 'As per Policy',
    isExternal: true,
    buttonLabel: "Apply",
    category: "Utilities"
  },
  {
    id: 's2',
    title: "Grievance Redressal",
    description: "File and track complaints about municipal services.",
    icon: AlertTriangle,
    link: "https://grs.ulbharyana.gov.in/",
    color: "bg-brand-red",
    accent: "text-brand-red",
    documents: ['Photo of Issue', 'Location'],
    timeframe: '7 Days',
    fees: 'Nil',
    isExternal: true,
    buttonLabel: "File Complaint",
    category: "Support"
  },
  {
    id: 's11',
    title: "Meat Shop License",
    description: "Apply for or renew meat shop license.",
    icon: Store,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-green",
    accent: "text-brand-green",
    documents: ['Shop Proof', 'Health Cert'],
    timeframe: '15 Days',
    fees: 'Annual',
    isExternal: true,
    buttonLabel: "Apply",
    category: "Commercial"
  },
  {
    id: 's12',
    title: "Debris Collection",
    description: "Request pickup service for construction waste (Malba).",
    icon: Truck,
    link: "https://online.ulbharyana.gov.in/",
    color: "bg-brand-orange",
    accent: "text-brand-orange",
    documents: ['Site Photo', 'Est. Quantity'],
    timeframe: '48 Hours',
    fees: 'Per Trolley',
    isExternal: true,
    buttonLabel: "Request",
    category: "Sanitation"
  }
];

// --- Departments ---
export const DEPARTMENTS: Department[] = [
  {
    id: 'engineering',
    name: 'Engineering Wing',
    icon: HardHat,
    description: 'Oversees the design, construction, and maintenance of public infrastructure like roads, bridges, and water systems.',
    incharge: 'Sh. Pankaj Saini',
    designation: 'Executive Engineer',
    employees: ['Narender Taneja (ME)', 'Sunil Kumar (ME)', 'Atul Kumar (JE)', 'Shiv Kumar (JE)'],
    acts: ['Haryana Municipal Act, 1973', 'National Building Code']
  },
  {
    id: 'sanitation',
    name: 'Sanitation Wing',
    icon: Trash2,
    description: 'Responsible for solid waste management, street cleaning, public health initiatives, and hygiene standards.',
    incharge: 'Sh. Avinash',
    designation: 'Chief Sanitary Inspector',
    employees: ['Anand Parkash (SI)', 'Sanjay Gujjar', 'Vikash', 'Parveen Kadian'],
    acts: ['Solid Waste Management Rules, 2016', 'Swachh Bharat Mission Guidelines']
  },
  {
    id: 'accounts',
    name: 'Accounts Wing',
    icon: Calculator,
    description: 'Manages municipal funds, budgeting, expense tracking, and financial compliance.',
    incharge: 'Sh. Sachin Singhal',
    designation: 'Accounts Officer',
    employees: ['Joginder Singh (Acct)', 'Ashok Kumar (Acct)'],
    acts: ['Municipal Accounting Code', 'General Financial Rules']
  },
  {
    id: 'tax',
    name: 'Taxation Wing',
    icon: Percent,
    description: 'Processes and manages property taxes, business licenses, and revenue collection.',
    incharge: 'Sh. Sachin Singhal',
    designation: 'Accounts Officer',
    employees: ['Rajpal-I', 'Rajpal-II', 'Roshan Kumar', 'Tejvir'],
    acts: ['Haryana Municipal Act (Taxation)', 'Property Tax Rules']
  },
  {
    id: 'rent',
    name: 'Rent / Estate',
    icon: Key,
    description: 'Manages the leasing and administration of municipal properties and market stalls.',
    incharge: 'Sh. Mohan Lal',
    designation: 'Secretary',
    employees: ['Priya', 'Vinit Kumar', 'Manender'],
    acts: ['Municipal Property Lease Rules', 'Transfer of Property Act']
  },
  {
    id: 'admin',
    name: 'Administration',
    icon: UserCheck,
    description: 'General administration, HR, and coordination of council meetings.',
    incharge: 'Sh. Devinder Kumar',
    designation: 'Executive Officer',
    employees: ['General Staff'],
    acts: ['Haryana Municipal Act, 1973']
  }
];

// --- Dignitaries (Hierarchy: National -> State -> District -> Municipal) ---
export const DIGNITARIES: Official[] = [
  {
    id: 'd1',
    name: 'Sh. Narendra Modi',
    designation: "Hon'ble Prime Minister",
    image: 'https://ui-avatars.com/api/?name=Narendra+Modi&background=ff9933&color=fff&size=512&bold=true',
    category: 'National',
    priority: 1
  },
  {
    id: 'd2',
    name: 'Sh. Nayab Singh Saini',
    designation: "Hon'ble Chief Minister",
    image: 'https://ui-avatars.com/api/?name=Nayab+Singh+Saini&background=478356&color=fff&size=512&bold=true',
    category: 'State',
    priority: 2
  },
  {
    id: 'd3',
    name: 'Sh. Swapnil Ravindra Patil, IAS',
    designation: "Deputy Commissioner",
    image: 'https://ui-avatars.com/api/?name=Swapnil+Patil&background=11486b&color=fff&size=512&bold=true', 
    category: 'District',
    priority: 3
  },
  {
    id: 'd4',
    name: 'Dr. Sushil, HCS',
    designation: "DMC Jhajjar",
    image: 'https://ui-avatars.com/api/?name=Sushil+HCS&background=11486b&color=fff&size=512&bold=true', 
    category: 'District',
    priority: 4
  }
];

// --- Municipal Officials ---
export const OFFICIALS: Official[] = [
  { 
    id: 'o1', 
    name: 'Sh. Devinder Kumar', 
    designation: 'Executive Officer', 
    image: 'https://ui-avatars.com/api/?name=Devinder+Kumar&background=ac2b49&color=fff&size=256', 
    phone: "+91-95820 75152", 
    email: "eo-jhajjar@ulbharyana.gov.in",
    category: 'Municipal'
  },
  { 
    id: 'o2', 
    name: 'Sh. Mohan Lal', 
    designation: 'Secretary', 
    image: 'https://ui-avatars.com/api/?name=Mohan+Lal&background=478356&color=fff&size=256', 
    phone: "+91 98964 00750", 
    email: "eo-jhajjar@ulbharyana.gov.in",
    category: 'Municipal'
  },
  { 
    id: 'o3', 
    name: 'Sh. Pankaj Saini', 
    designation: 'Municipal Engineer', 
    image: 'https://ui-avatars.com/api/?name=Pankaj+Saini&background=da6328&color=fff&size=256', 
    phone: "+91 98964 12345", 
    email: "me-jhajjar@ulbharyana.gov.in",
    category: 'Municipal'
  },
  { 
    id: 'o4', 
    name: 'Sh. Avinash', 
    designation: 'Chief Sanitary Inspector', 
    image: 'https://ui-avatars.com/api/?name=Avinash+CSI&background=ffa425&color=fff&size=256', 
    phone: "+91 98123 45678", 
    email: "csi-jhajjar@ulbharyana.gov.in",
    category: 'Municipal'
  },
];

// --- News ---
const currentYear = new Date().getFullYear();
export const LATEST_NEWS: NewsItem[] = [
  { 
    id: '1', 
    title: 'Notification: Extension of Interest Waiver Scheme', 
    date: `${currentYear}-02-15`, 
    category: 'Notification', 
    link: '#',
    summary: "The government has extended the interest waiver scheme for property tax dues till 31st March."
  },
  { 
    id: '2', 
    title: 'Public Notice: Survey for Street Vendors', 
    date: `${currentYear}-02-10`, 
    category: 'Circular', 
    link: '#',
    summary: "All street vendors are requested to register for the SVANidhi scheme at the MC office."
  },
  { 
    id: '3', 
    title: 'Auction notice for municipal shops in Sector 4', 
    date: `${currentYear}-01-25`, 
    category: 'Tender', 
    link: '#',
    summary: "Open auction for 15 commercial sites on leasehold basis."
  },
  { 
    id: '4', 
    title: 'Alert: Heavy Rain Forecast - Emergency Numbers', 
    date: `${currentYear}-02-20`, 
    category: 'Circular', 
    link: '#',
    summary: "Citizens are advised to stay indoors. Contact control room 01251-252002 for emergencies."
  },
  { 
    id: '5', 
    title: 'Health Camp: Free Checkup at Community Center', 
    date: `${currentYear}-02-18`, 
    category: 'Notification', 
    link: '#',
    summary: "Free general health and eye checkup camp organized by MCJ on coming Sunday."
  }
];

// --- Stats ---
export const CITY_STATS: Stat[] = [
  { label: 'Properties', value: '34,971+', icon: Home, color: "text-brand-blue" },
  { label: 'Connections', value: '48,000+', icon: Droplets, color: "text-brand-blue" },
  { label: 'Complaints Solved', value: '98%', icon: AlertTriangle, color: "text-brand-green" },
  { label: 'Street Lights', value: '5,000+', icon: Landmark, color: "text-brand-yellow" },
];