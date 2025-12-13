export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

/**
 * Represents a citizen service provided by the municipal council.
 * Used for generating service cards and modal details.
 */
export interface Service {
  /** Unique identifier for the service (UUID) */
  id: string;
  /** Display title of the service */
  title: string;
  /** Short description explaining the service utility */
  description: string;
  /** Icon name mapped to Lucide icons in constants.ts */
  icon: string;
  /** URL to the application portal */
  link: string;
  /** Tailwind text color class for the icon container */
  color: string;
  /** Tailwind text color class for accents */
  accent: string;
  /** List of required document names */
  documents: string[];
  /** Estimated processing time (e.g., "15 Days") */
  timeframe: string;
  /** Applicable fees or "Free" */
  fees: string;
  /** If true, opens in a new tab; otherwise opens internal modal/page */
  isExternal?: boolean;
  /** Custom label for the action button */
  buttonLabel?: string;
  /** Category for filtering (e.g., "Finance", "Health") */
  category?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  link: string;
  summary?: string;
  content?: string; // HTML content for the modal
  created_at?: string;
}

export interface Suggestion {
  id: string;
  type: 'Bug Report' | 'Feature' | 'Content Error' | 'Suggestion';
  message: string;
  status: string;
  created_at: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
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
  icon: string;
  description: string;
  incharge: string;
  designation: string;
  employees: string[];
  acts: string[];
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  size: string;
  format: string;
  description: string;
  link?: string;
}

export interface Tender {
  id: string;
  description: string;
  closing_date: string;
  status: 'Active' | 'Closed';
  is_new: boolean;
}