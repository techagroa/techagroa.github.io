export type Language = 'en' | 'si' | 'ta';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  district: string;
  reputation: number;
  isPremium: boolean;
  role: 'farmer' | 'buyer' | 'officer';
  mode: 'demo' | 'connected';
}

export interface CropStock {
  id: string;
  crop: string;
  qty: number; // in kg
  district: string;
  days: string;
  harvestDate?: string;
  createdAt: number;
}

export interface LedgerCycle {
  id: string;
  name: string;
  active: boolean;
  acres: number;
  category?: 'paddy' | 'vegetables' | 'fruits' | 'livestock';
  cropVariety?: string;
  land: number; // minor units or LKR
  inputs: number;
  labor: number;
  harvest: number;
  income: number;
  createdAt?: number;
}

export type TransactionType = 'income' | 'expense';
export type ExpenseCategory = 'land-prep' | 'inputs' | 'labor' | 'harvest';

export interface Transaction {
  id: string;
  desc: string;
  amount: number; // LKR
  type: TransactionType;
  date: string; // YYYY-MM-DD
  cycleId: string;
  category: string;
  merchant?: string;
  receiptImage?: string;
  createdAt: number;
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  price: number;
  unit?: string; // kg, L, pcs, bag
  category: string;
  type?: string;
  badge?: string;
  limit?: string;
  icon?: string;
  rating?: string;
  vendor: string;
  phone?: string;
  district?: string;
  photo?: string;
  isSubsidized?: boolean;
  isSold?: boolean;
  ownerId?: string;
  description?: string;
  createdAt?: number;
}

export interface Grievance {
  id: string;
  center: string;
  category: string;
  desc: string;
  date: string;
  status: 'Draft' | 'Queued' | 'Received' | 'In Progress' | 'Resolved';
  photo?: string;
  location?: { lat: number; lng: number; accuracy?: number };
  createdAt: number;
}

export interface PersonalLoan {
  id: string;
  bank: string;
  type: string;
  principal: number;
  outstanding: number;
  rate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
  citations?: string[];
}

export interface DiscussionReply {
  id: string;
  author: string;
  text: string;
  ts: number;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  ts: number;
  replies: DiscussionReply[];
}

export interface CommunityPost {
  id: string;
  author: string;
  title: string;
  body: string;
  type: 'question' | 'tip' | 'price' | 'alert';
  district: string;
  time: string;
  helpfulCount: number;
  repliesCount: number;
  replies: { author: string; text: string; time: string }[];
  reported?: boolean;
  ts: number;
}

export interface EquipmentBooking {
  id: string;
  equipmentName: string;
  supplier: string;
  date: string;
  duration: number;
  unit: string;
  estimatedCost: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: number;
}

export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  body: string;
  h: number; // hours ago or timestamp
  isRead: boolean;
  createdAt: number;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  readTime: string;
  content: {
    heading: string;
    text: string;
    bullets?: string[];
  }[];
  keyTakeaways: string[];
  completed: boolean;
}
