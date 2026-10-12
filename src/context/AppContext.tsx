import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserProfile,
  CropStock,
  LedgerCycle,
  Transaction,
  MarketplaceProduct,
  Grievance,
  PersonalLoan,
  ChatMessage,
  Discussion,
  CommunityPost,
  EquipmentBooking,
  NotificationItem,
  Lesson
} from '../types';
import { i18n } from '../data/i18n';
import {
  initialUser,
  initialCropStocks,
  initialLedgerCycles,
  initialTransactions,
  initialGrievances,
  initialLoans,
  initialChatMessages,
  initialDiscussions,
  initialNotifications,
  initialCommunityPosts,
  initialProducts
} from '../data/initialState';
import { lessonsData } from '../data/lessonsData';
import {
  getAllFromStore,
  saveToStore,
  deleteFromStore,
  clearStore
} from '../services/storage';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  user: UserProfile;
  updateUser: (u: Partial<UserProfile>) => void;
  toastMsg: string | null;
  showToast: (msg: string) => void;

  // Crops & Stock
  cropStocks: CropStock[];
  addCropStock: (crop: string, district: string, qty: number, days: string) => Promise<void>;
  deleteCropStock: (id: string) => Promise<void>;

  // Ledger & Cycles
  ledgerCycles: LedgerCycle[];
  activeCycleId: string;
  setActiveCycleId: (id: string) => void;
  transactions: Transaction[];
  addCycle: (season: string, category: 'paddy' | 'vegetables' | 'fruits' | 'livestock', variety: string, acres: number) => Promise<void>;
  addTransaction: (desc: string, amount: number, type: 'income' | 'expense', category: string, date?: string, merchant?: string, receiptImage?: string) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;

  // Marketplace
  marketplaceProducts: MarketplaceProduct[];
  marketRole: 'farmer' | 'business' | 'state';
  setMarketRole: (role: 'farmer' | 'business' | 'state') => void;
  marketCategory: string;
  setMarketCategory: (cat: string) => void;
  marketSearch: string;
  setMarketSearch: (s: string) => void;
  selectedListing: MarketplaceProduct | null;
  setSelectedListing: (p: MarketplaceProduct | null) => void;
  addListing: (product: Omit<MarketplaceProduct, 'id' | 'createdAt' | 'vendor' | 'isSold'>) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  toggleSoldListing: (id: string) => Promise<void>;

  // Equipment
  equipmentMode: 'rent' | 'buy';
  setEquipmentMode: (mode: 'rent' | 'buy') => void;
  selectedEquipment: any | null;
  setSelectedEquipment: (eq: any | null) => void;
  equipmentBookings: EquipmentBooking[];
  bookEquipment: (eqName: string, supplier: string, date: string, duration: number, unit: string, estimate: number) => Promise<void>;

  // Grievances
  grievances: Grievance[];
  addGrievance: (center: string, category: string, desc: string, photo?: string, location?: { lat: number; lng: number }) => Promise<void>;

  // Finance
  loans: PersonalLoan[];
  financeTab: 'loans' | 'insurance';
  setFinanceTab: (tab: 'loans' | 'insurance') => void;

  // AI Expert
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;

  // Community & Discussions
  communityTab: 'discussions' | 'districts';
  setCommunityTab: (tab: 'discussions' | 'districts') => void;
  discussions: Discussion[];
  selectedDiscussion: Discussion | null;
  setSelectedDiscussion: (d: Discussion | null) => void;
  addDiscussion: (title: string, content: string, category: string) => Promise<void>;
  addDiscussionReply: (discId: string, text: string) => Promise<void>;
  deleteDiscussion: (discId: string) => Promise<void>;

  communityPosts: CommunityPost[];
  selectedCommunityDistrict: string;
  setSelectedCommunityDistrict: (d: string) => void;
  joinedDistricts: string[];
  toggleJoinDistrict: (d: string) => void;
  addCommunityPost: (title: string, body: string, type: 'question' | 'tip' | 'price' | 'alert', district: string) => Promise<void>;
  toggleHelpfulPost: (postId: string) => void;
  reportPost: (postId: string) => void;
  undoReportPost: (postId: string) => void;
  deleteCommunityPost: (postId: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Lessons
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  setSelectedLesson: (l: Lesson | null) => void;
  completeLesson: (id: string) => void;

  // Reset demo
  resetToDemoData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('zfarm_lang') as Language) || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('zfarm_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  // State collections
  const [cropStocks, setCropStocks] = useState<CropStock[]>(initialCropStocks);
  const [ledgerCycles, setLedgerCycles] = useState<LedgerCycle[]>(initialLedgerCycles);
  const [activeCycleId, setActiveCycleId] = useState<string>('c1');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [marketplaceProducts, setMarketplaceProducts] = useState<MarketplaceProduct[]>(initialProducts);
  const [marketRole, setMarketRole] = useState<'farmer' | 'business' | 'state'>('farmer');
  const [marketCategory, setMarketCategory] = useState<string>('all');
  const [marketSearch, setMarketSearch] = useState<string>('');
  const [selectedListing, setSelectedListing] = useState<MarketplaceProduct | null>(null);

  const [equipmentMode, setEquipmentMode] = useState<'rent' | 'buy'>('rent');
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null);
  const [equipmentBookings, setEquipmentBookings] = useState<EquipmentBooking[]>([]);

  const [grievances, setGrievances] = useState<Grievance[]>(initialGrievances);
  const [loans, setLoans] = useState<PersonalLoan[]>(initialLoans);
  const [financeTab, setFinanceTab] = useState<'loans' | 'insurance'>('loans');

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  const [communityTab, setCommunityTab] = useState<'discussions' | 'districts'>('discussions');
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(initialCommunityPosts);
  const [selectedCommunityDistrict, setSelectedCommunityDistrict] = useState<string>('Polonnaruwa');
  const [joinedDistricts, setJoinedDistricts] = useState<string[]>(['Polonnaruwa']);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [reportedPosts, setReportedPosts] = useState<string[]>([]);

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [lessons, setLessons] = useState<Lesson[]>(lessonsData);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Initialize from IndexedDB on startup
  useEffect(() => {
    async function loadIndexedData() {
      try {
        const stocks = await getAllFromStore<CropStock>('cropStocks');
        if (stocks.length > 0) setCropStocks(stocks);

        const cycles = await getAllFromStore<LedgerCycle>('ledgerCycles');
        if (cycles.length > 0) setLedgerCycles(cycles);

        const txns = await getAllFromStore<Transaction>('transactions');
        if (txns.length > 0) setTransactions(txns);

        const prods = await getAllFromStore<MarketplaceProduct>('marketplaceProducts');
        if (prods.length > 0) setMarketplaceProducts(prods);

        const grievs = await getAllFromStore<Grievance>('grievances');
        if (grievs.length > 0) setGrievances(grievs);

        const discs = await getAllFromStore<Discussion>('discussions');
        if (discs.length > 0) setDiscussions(discs);

        const posts = await getAllFromStore<CommunityPost>('communityPosts');
        if (posts.length > 0) setCommunityPosts(posts);

        const books = await getAllFromStore<EquipmentBooking>('equipmentBookings');
        if (books.length > 0) setEquipmentBookings(books);
      } catch (e) {
        console.warn('Initial IndexedDB loading error', e);
      }
    }
    loadIndexedData();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('zfarm_lang', lang);
  };

  const t = (key: string, defaultText?: string): string => {
    const dict = (i18n as any)[language] || (i18n as any).en;
    if (dict && dict[key]) return dict[key];
    const enDict = (i18n as any).en;
    if (enDict && enDict[key]) return enDict[key];
    return defaultText || key;
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const openModal = (modalId: string) => setActiveModal(modalId);
  const closeModal = () => setActiveModal(null);

  const updateUser = (u: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...u };
      localStorage.setItem('zfarm_user', JSON.stringify(updated));
      return updated;
    });
  };

  // Stock operations
  const addCropStock = async (crop: string, district: string, qty: number, days: string) => {
    const newStock: CropStock = {
      id: 's_' + Date.now(),
      crop,
      district,
      qty: Math.max(1, qty),
      days: days.includes('harvest') ? days : `${days}d to harvest`,
      createdAt: Date.now()
    };
    const updated = [newStock, ...cropStocks];
    setCropStocks(updated);
    await saveToStore('cropStocks', newStock);
    showToast(`${crop} stock of ${qty} kg added!`);
  };

  const deleteCropStock = async (id: string) => {
    const updated = cropStocks.filter(s => s.id !== id);
    setCropStocks(updated);
    await deleteFromStore('cropStocks', id);
    showToast('Stock record removed');
  };

  // Ledger operations
  const addCycle = async (season: string, category: 'paddy' | 'vegetables' | 'fruits' | 'livestock', variety: string, acres: number) => {
    const newCycle: LedgerCycle = {
      id: 'c_' + Date.now(),
      name: `${season} - ${variety}`,
      active: true,
      acres: Math.max(0.1, acres),
      category,
      cropVariety: variety,
      land: 0,
      inputs: 0,
      labor: 0,
      harvest: 0,
      income: 0,
      createdAt: Date.now()
    };
    // Make previous active inactive
    const updated = ledgerCycles.map(c => ({ ...c, active: false }));
    const finalList = [newCycle, ...updated];
    setLedgerCycles(finalList);
    setActiveCycleId(newCycle.id);
    await saveToStore('ledgerCycles', newCycle);
    showToast(`New cycle created: ${newCycle.name}`);
  };

  const addTransaction = async (
    desc: string,
    amount: number,
    type: 'income' | 'expense',
    category: string,
    date?: string,
    merchant?: string,
    receiptImage?: string
  ) => {
    const newTxn: Transaction = {
      id: 't_' + Date.now(),
      desc,
      amount: Math.round(Math.max(1, amount)),
      type,
      category,
      date: date || new Date().toISOString().split('T')[0],
      cycleId: activeCycleId,
      merchant,
      receiptImage,
      createdAt: Date.now()
    };
    const updatedTxns = [newTxn, ...transactions];
    setTransactions(updatedTxns);
    await saveToStore('transactions', newTxn);

    // Update active cycle summary
    setLedgerCycles(prev =>
      prev.map(c => {
        if (c.id !== activeCycleId) return c;
        const updatedCycle = { ...c };
        if (type === 'income') {
          updatedCycle.income = (updatedCycle.income || 0) + newTxn.amount;
        } else {
          if (category === 'land-prep') updatedCycle.land = (updatedCycle.land || 0) + newTxn.amount;
          else if (category === 'inputs') updatedCycle.inputs = (updatedCycle.inputs || 0) + newTxn.amount;
          else if (category === 'labor') updatedCycle.labor = (updatedCycle.labor || 0) + newTxn.amount;
          else if (category === 'harvest') updatedCycle.harvest = (updatedCycle.harvest || 0) + newTxn.amount;
        }
        saveToStore('ledgerCycles', updatedCycle);
        return updatedCycle;
      })
    );

    showToast(`LKR ${amount.toLocaleString()} ${type} recorded!`);
  };

  const deleteTransaction = async (id: string) => {
    const target = transactions.find(t => t.id === id);
    if (!target) return;
    const updatedTxns = transactions.filter(t => t.id !== id);
    setTransactions(updatedTxns);
    await deleteFromStore('transactions', id);

    // Revert cycle totals
    setLedgerCycles(prev =>
      prev.map(c => {
        if (c.id !== target.cycleId) return c;
        const updatedCycle = { ...c };
        if (target.type === 'income') {
          updatedCycle.income = Math.max(0, (updatedCycle.income || 0) - target.amount);
        } else {
          if (target.category === 'land-prep') updatedCycle.land = Math.max(0, (updatedCycle.land || 0) - target.amount);
          else if (target.category === 'inputs') updatedCycle.inputs = Math.max(0, (updatedCycle.inputs || 0) - target.amount);
          else if (target.category === 'labor') updatedCycle.labor = Math.max(0, (updatedCycle.labor || 0) - target.amount);
          else if (target.category === 'harvest') updatedCycle.harvest = Math.max(0, (updatedCycle.harvest || 0) - target.amount);
        }
        saveToStore('ledgerCycles', updatedCycle);
        return updatedCycle;
      })
    );

    showToast('Transaction deleted');
  };

  // Marketplace operations
  const addListing = async (productData: Omit<MarketplaceProduct, 'id' | 'createdAt' | 'vendor' | 'isSold'>) => {
    const newProduct: MarketplaceProduct = {
      ...productData,
      id: 'p_' + Date.now(),
      vendor: user.name,
      ownerId: user.id,
      isSold: false,
      createdAt: Date.now()
    };
    const updated = [newProduct, ...marketplaceProducts];
    setMarketplaceProducts(updated);
    await saveToStore('marketplaceProducts', newProduct);
    showToast(`"${newProduct.name}" published to marketplace!`);
  };

  const deleteListing = async (id: string) => {
    const updated = marketplaceProducts.filter(p => p.id !== id);
    setMarketplaceProducts(updated);
    await deleteFromStore('marketplaceProducts', id);
    showToast('Listing removed');
  };

  const toggleSoldListing = async (id: string) => {
    const updated = marketplaceProducts.map(p => {
      if (p.id !== id) return p;
      const modified = { ...p, isSold: !p.isSold };
      saveToStore('marketplaceProducts', modified);
      return modified;
    });
    setMarketplaceProducts(updated);
    showToast('Listing status updated');
  };

  // Grievance operations
  const addGrievance = async (
    center: string,
    category: string,
    desc: string,
    photo?: string,
    location?: { lat: number; lng: number }
  ) => {
    const newGrievance: Grievance = {
      id: 'g_' + Date.now(),
      center,
      category,
      desc,
      photo,
      location,
      date: new Date().toISOString().split('T')[0],
      status: 'Queued',
      createdAt: Date.now()
    };
    const updated = [newGrievance, ...grievances];
    setGrievances(updated);
    await saveToStore('grievances', newGrievance);
    showToast('Grievance report queued (Ref: #' + newGrievance.id.slice(-6).toUpperCase() + ')');
  };

  // Chat operations
  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg]);
  };

  // Community operations
  const addDiscussion = async (title: string, content: string, category: string) => {
    const newDisc: Discussion = {
      id: 'd_' + Date.now(),
      title,
      content,
      category,
      author: user.name,
      ts: Date.now(),
      replies: []
    };
    const updated = [newDisc, ...discussions];
    setDiscussions(updated);
    await saveToStore('discussions', newDisc);
    showToast('Discussion published to community!');
  };

  const addDiscussionReply = async (discId: string, text: string) => {
    const updated = discussions.map(d => {
      if (d.id !== discId) return d;
      const newReply = {
        id: 'r_' + Date.now(),
        author: user.name,
        text,
        ts: Date.now()
      };
      const modified = { ...d, replies: [...d.replies, newReply] };
      saveToStore('discussions', modified);
      if (selectedDiscussion?.id === discId) setSelectedDiscussion(modified);
      return modified;
    });
    setDiscussions(updated);
    showToast('Reply posted');
  };

  const deleteDiscussion = async (discId: string) => {
    const updated = discussions.filter(d => d.id !== discId);
    setDiscussions(updated);
    await deleteFromStore('discussions', discId);
    if (selectedDiscussion?.id === discId) setSelectedDiscussion(null);
    showToast('Discussion removed');
  };

  const toggleJoinDistrict = (district: string) => {
    setJoinedDistricts(prev => {
      const exists = prev.includes(district);
      const updated = exists ? prev.filter(d => d !== district) : [...prev, district];
      showToast(exists ? `Left ${district} community` : `Joined ${district} community!`);
      return updated;
    });
  };

  const addCommunityPost = async (title: string, body: string, type: 'question' | 'tip' | 'price' | 'alert', district: string) => {
    const newPost: CommunityPost = {
      id: 'cp_' + Date.now(),
      author: user.name,
      title,
      body,
      type,
      district,
      time: 'Just now',
      helpfulCount: 0,
      repliesCount: 0,
      replies: [],
      ts: Date.now()
    };
    const updated = [newPost, ...communityPosts];
    setCommunityPosts(updated);
    await saveToStore('communityPosts', newPost);
    showToast('Post shared to ' + district + ' community!');
  };

  const toggleHelpfulPost = (postId: string) => {
    const isLiked = likedPosts.includes(postId);
    setLikedPosts(prev => isLiked ? prev.filter(id => id !== postId) : [...prev, postId]);
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const modified = { ...p, helpfulCount: isLiked ? Math.max(0, p.helpfulCount - 1) : p.helpfulCount + 1 };
        saveToStore('communityPosts', modified);
        return modified;
      })
    );
  };

  const reportPost = (postId: string) => {
    setReportedPosts(prev => [...prev, postId]);
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const modified = { ...p, reported: true };
        saveToStore('communityPosts', modified);
        return modified;
      })
    );
    showToast('Post reported and hidden from view');
  };

  const undoReportPost = (postId: string) => {
    setReportedPosts(prev => prev.filter(id => id !== postId));
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const modified = { ...p, reported: false };
        saveToStore('communityPosts', modified);
        return modified;
      })
    );
    showToast('Report undone');
  };

  const deleteCommunityPost = async (postId: string) => {
    const updated = communityPosts.filter(p => p.id !== postId);
    setCommunityPosts(updated);
    await deleteFromStore('communityPosts', postId);
    showToast('Post deleted');
  };

  const bookEquipment = async (
    equipmentName: string,
    supplier: string,
    date: string,
    duration: number,
    unit: string,
    estimate: number
  ) => {
    const newBooking: EquipmentBooking = {
      id: 'b_' + Date.now(),
      equipmentName,
      supplier,
      date,
      duration,
      unit,
      estimatedCost: estimate,
      status: 'Pending',
      createdAt: Date.now()
    };
    const updated = [newBooking, ...equipmentBookings];
    setEquipmentBookings(updated);
    await saveToStore('equipmentBookings', newBooking);
    showToast(`Booking request sent for ${equipmentName}!`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const completeLesson = (id: string) => {
    setLessons(prev =>
      prev.map(l => (l.id === id ? { ...l, completed: true } : l))
    );
    showToast('Lesson marked completed! Track updated.');
  };

  const resetToDemoData = async () => {
    await clearStore('cropStocks');
    await clearStore('ledgerCycles');
    await clearStore('transactions');
    await clearStore('marketplaceProducts');
    await clearStore('grievances');
    await clearStore('discussions');
    await clearStore('communityPosts');
    await clearStore('equipmentBookings');

    setCropStocks(initialCropStocks);
    setLedgerCycles(initialLedgerCycles);
    setActiveCycleId('c1');
    setTransactions(initialTransactions);
    setMarketplaceProducts(initialProducts);
    setGrievances(initialGrievances);
    setDiscussions(initialDiscussions);
    setCommunityPosts(initialCommunityPosts);
    setEquipmentBookings([]);
    setNotifications(initialNotifications);
    setUser(initialUser);
    localStorage.removeItem('zfarm_user');

    showToast('Demo data reset to clean initial state');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        activeModal,
        openModal,
        closeModal,
        user,
        updateUser,
        toastMsg,
        showToast,

        cropStocks,
        addCropStock,
        deleteCropStock,

        ledgerCycles,
        activeCycleId,
        setActiveCycleId,
        transactions,
        addCycle,
        addTransaction,
        deleteTransaction,

        marketplaceProducts,
        marketRole,
        setMarketRole,
        marketCategory,
        setMarketCategory,
        marketSearch,
        setMarketSearch,
        selectedListing,
        setSelectedListing,
        addListing,
        deleteListing,
        toggleSoldListing,

        equipmentMode,
        setEquipmentMode,
        selectedEquipment,
        setSelectedEquipment,
        equipmentBookings,
        bookEquipment,

        grievances,
        addGrievance,

        loans,
        financeTab,
        setFinanceTab,

        chatMessages,
        addChatMessage,

        communityTab,
        setCommunityTab,
        discussions,
        selectedDiscussion,
        setSelectedDiscussion,
        addDiscussion,
        addDiscussionReply,
        deleteDiscussion,

        communityPosts,
        selectedCommunityDistrict,
        setSelectedCommunityDistrict,
        joinedDistricts,
        toggleJoinDistrict,
        addCommunityPost,
        toggleHelpfulPost,
        reportPost,
        undoReportPost,
        deleteCommunityPost,

        notifications,
        markNotificationRead,
        markAllNotificationsRead,

        lessons,
        selectedLesson,
        setSelectedLesson,
        completeLesson,

        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
