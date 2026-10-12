import {
  CropStock,
  LedgerCycle,
  Transaction,
  MarketplaceProduct,
  Grievance,
  PersonalLoan,
  ChatMessage,
  Discussion,
  CommunityPost,
  NotificationItem,
  UserProfile
} from '../types';
import { initialMarketProducts } from './initialMarketProducts';
import { ALERT_ITEMS } from './alertsData';

export const initialUser: UserProfile = {
  id: 'u_saman',
  name: 'Saman Perera',
  phone: '077 123 4567',
  district: 'Polonnaruwa',
  reputation: 98,
  isPremium: true,
  role: 'farmer',
  mode: 'demo'
};

export const initialCropStocks: CropStock[] = [
  { id: 's1', crop: 'Paddy (Nadu)', qty: 2500, district: 'Polonnaruwa', days: '64d to harvest', createdAt: Date.now() - 86400000 * 5 },
  { id: 's2', crop: 'Tomato', qty: 450, district: 'Kurunegala', days: '12d to harvest', createdAt: Date.now() - 86400000 * 3 }
];

export const initialLedgerCycles: LedgerCycle[] = [
  { id: 'c1', name: 'Yala Season 2026 - Paddy', active: true, acres: 2, category: 'paddy', cropVariety: 'Paddy (Nadu BG 366)', land: 26200, inputs: 34500, labor: 28000, harvest: 10000, income: 95000, createdAt: 1779000000000 },
  { id: 'c2', name: 'Maha Season 2025/26 - Paddy', active: false, acres: 3.5, category: 'paddy', cropVariety: 'Paddy (Samba BG 358)', land: 42000, inputs: 54000, labor: 35000, harvest: 22000, income: 245000, createdAt: 1765000000000 }
];

export const initialTransactions: Transaction[] = [
  { id: 't1', desc: 'Paddy harvest sale (Nadu)', amount: 95000, type: 'income', date: '2026-06-12', cycleId: 'c1', category: 'income', createdAt: 1781250000000 },
  { id: 't2', desc: 'Urea Fertilizer 50kg (Subsidized)', amount: 3200, type: 'expense', date: '2026-06-05', cycleId: 'c1', category: 'inputs', merchant: 'Lanka Agro Depot', createdAt: 1780650000000 },
  { id: 't3', desc: 'Tractor Land preparation hire', amount: 9000, type: 'expense', date: '2026-05-28', cycleId: 'c1', category: 'land-prep', merchant: 'Ranjith Motors', createdAt: 1779950000000 },
  { id: 't4', desc: 'Seed Paddy purchases (RRDI)', amount: 8500, type: 'expense', date: '2026-05-25', cycleId: 'c1', category: 'inputs', merchant: 'Rice Research Bathalagoda', createdAt: 1779650000000 }
];

export const initialGrievances: Grievance[] = [
  {
    id: 'g1',
    center: 'Polonnaruwa Agrarian Service Center',
    category: 'Fertilizer Shortage',
    desc: 'Subsidized Urea not available at depot for 2 weeks. Farmers stranded.',
    date: '2026-06-18',
    status: 'In Progress',
    location: { lat: 7.9403, lng: 81.0188 },
    createdAt: Date.now() - 86400000 * 2
  }
];

export const initialLoans: PersonalLoan[] = [
  { id: 'l1', bank: 'Bank of Ceylon (BOC)', type: 'Crop Cultivation Loan', principal: 250000, outstanding: 120000, rate: '6% Fixed' }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'bot',
    text: 'Hello! I am GoviyaAI, your Sri Lankan agricultural expert. Ask me about crop diseases, Maha/Yala seasons, or fertilizer formulas!',
    timestamp: Date.now()
  }
];

export const initialDiscussions: Discussion[] = [
  {
    id: 'd1',
    title: 'Best time to plant paddy in Yala season?',
    content: 'I am planning to plant paddy this Yala season. What is the recommended time in the dry zone?',
    category: 'Crops',
    author: 'Kamal Perera',
    ts: Date.now() - 172800000,
    replies: [{ id: 'r1', author: 'Sunil Silva', text: 'Usually mid-April to early May works best in Polonnaruwa irrigation areas.', ts: Date.now() - 86400000 }]
  },
  {
    id: 'd2',
    title: 'Pest problem in tomato plants',
    content: 'My tomato leaves have white spots and leaf curling. Any idea what this is?',
    category: 'Pests',
    author: 'Nimal Fernando',
    ts: Date.now() - 28800000,
    replies: []
  },
  {
    id: 'd3',
    title: 'Where to buy drip irrigation kits?',
    content: 'Looking for affordable drip irrigation for a 1-acre vegetable plot in Kurunegala.',
    category: 'Equipment',
    author: 'Sunil Jayasuriya',
    ts: Date.now() - 3600000,
    replies: []
  }
];

export const initialNotifications: NotificationItem[] = ALERT_ITEMS.map((item, idx) => ({
  id: item.id,
  icon: item.icon,
  title: item.title,
  body: item.body,
  h: item.h,
  isRead: false,
  createdAt: Date.now() - item.h * 3600000
}));

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'cp1',
    author: 'Sunil Gamage',
    title: 'Nadu Paddy Gate Price Today',
    body: 'Millers buying Nadu paddy at LKR 108/kg at Kaduruwela junction today.',
    type: 'price',
    district: 'Polonnaruwa',
    time: '2 hours ago',
    helpfulCount: 14,
    repliesCount: 3,
    replies: [
      { author: 'Lalith K.', text: 'Is moisture content tested strictly?', time: '1 hour ago' },
      { author: 'Sunil Gamage', text: 'Yes, 14% max for that price.', time: '45 mins ago' }
    ],
    ts: Date.now() - 7200000
  },
  {
    id: 'cp2',
    author: 'Dr. Chandana (DOA)',
    title: 'Brown Planthopper (BPH) Precaution',
    body: 'Minor outbreak spotted in Medirigiriya tracts. Avoid excessive urea spraying and check stem bases.',
    type: 'alert',
    district: 'Polonnaruwa',
    time: '5 hours ago',
    helpfulCount: 32,
    repliesCount: 4,
    replies: [],
    ts: Date.now() - 18000000
  },
  {
    id: 'cp3',
    author: 'Ruwan Wijesinghe',
    title: 'Harvester availability for rent',
    body: 'Kubota DC-68 available for harvesting from tomorrow. Reasonable rates.',
    type: 'tip',
    district: 'Anuradhapura',
    time: '1 day ago',
    helpfulCount: 9,
    repliesCount: 1,
    replies: [],
    ts: Date.now() - 86400000
  }
];

export const initialProducts: MarketplaceProduct[] = (initialMarketProducts as any[]).map(p => ({
  id: p.id,
  name: p.name,
  price: p.price,
  category: p.category,
  type: p.type,
  badge: p.badge,
  limit: p.limit,
  icon: p.icon,
  rating: p.rating,
  vendor: p.vendor,
  phone: '077 123 4567',
  district: 'Polonnaruwa',
  isSubsidized: p.isSubsidized,
  isSold: false,
  ownerId: p.vendor === 'Saman Perera' ? 'u_saman' : undefined,
  createdAt: Date.now() - 86400000 * 2
}));
