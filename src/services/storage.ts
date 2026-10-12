import { openDB, DBSchema, IDBPDatabase } from 'idb';
import {
  CropStock,
  LedgerCycle,
  Transaction,
  MarketplaceProduct,
  Grievance,
  PersonalLoan,
  Discussion,
  CommunityPost,
  EquipmentBooking,
  NotificationItem,
  Lesson
} from '../types';

interface ZFARMDB extends DBSchema {
  cropStocks: { key: string; value: CropStock };
  ledgerCycles: { key: string; value: LedgerCycle };
  transactions: { key: string; value: Transaction };
  marketplaceProducts: { key: string; value: MarketplaceProduct };
  grievances: { key: string; value: Grievance };
  loans: { key: string; value: PersonalLoan };
  discussions: { key: string; value: Discussion };
  communityPosts: { key: string; value: CommunityPost };
  equipmentBookings: { key: string; value: EquipmentBooking };
  notifications: { key: string; value: NotificationItem };
  lessons: { key: string; value: Lesson };
  preferences: { key: string; value: any };
  syncQueue: { key: string; value: { id: string; action: string; storeName: string; data: any; timestamp: number } };
}

const DB_NAME = 'zfarm_database_v1';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<ZFARMDB>> | null = null;

export async function getDB(): Promise<IDBPDatabase<ZFARMDB>> {
  if (!dbPromise) {
    dbPromise = openDB<ZFARMDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('cropStocks')) db.createObjectStore('cropStocks', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('ledgerCycles')) db.createObjectStore('ledgerCycles', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('transactions')) db.createObjectStore('transactions', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('marketplaceProducts')) db.createObjectStore('marketplaceProducts', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('grievances')) db.createObjectStore('grievances', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('loans')) db.createObjectStore('loans', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('discussions')) db.createObjectStore('discussions', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('communityPosts')) db.createObjectStore('communityPosts', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('equipmentBookings')) db.createObjectStore('equipmentBookings', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('notifications')) db.createObjectStore('notifications', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('lessons')) db.createObjectStore('lessons', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('preferences')) db.createObjectStore('preferences');
        if (!db.objectStoreNames.contains('syncQueue')) db.createObjectStore('syncQueue', { keyPath: 'id' });
      }
    });
  }
  return dbPromise;
}

export async function getAllFromStore<T>(storeName: any): Promise<T[]> {
  try {
    const db = await getDB();
    return (await db.getAll(storeName)) as T[];
  } catch (err) {
    console.warn(`IndexedDB read failed for ${storeName}, falling back`, err);
    return [];
  }
}

export async function saveToStore<T extends { id: string }>(storeName: any, item: T): Promise<void> {
  try {
    const db = await getDB();
    await db.put(storeName, item);
  } catch (err) {
    console.warn(`IndexedDB write failed for ${storeName}`, err);
  }
}

export async function deleteFromStore(storeName: any, id: string): Promise<void> {
  try {
    const db = await getDB();
    await db.delete(storeName, id);
  } catch (err) {
    console.warn(`IndexedDB delete failed for ${storeName}`, err);
  }
}

export async function clearStore(storeName: any): Promise<void> {
  try {
    const db = await getDB();
    await db.clear(storeName);
  } catch (err) {
    console.warn(`IndexedDB clear failed for ${storeName}`, err);
  }
}
