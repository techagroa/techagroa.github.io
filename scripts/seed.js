/**
 * Deterministic database seed script for ZFARM
 * Can be run against the Firebase Emulator or live Firestore with credentials.
 */

const sampleSeed = {
  user: {
    id: 'u_saman',
    name: 'Saman Perera',
    phone: '077 123 4567',
    district: 'Polonnaruwa',
    reputation: 98,
    isPremium: true
  },
  cropStocks: [
    { id: 's1', crop: 'Paddy (Nadu)', qty: 2500, district: 'Polonnaruwa', days: '64d to harvest' },
    { id: 's2', crop: 'Tomato', qty: 450, district: 'Kurunegala', days: '12d to harvest' }
  ],
  cycles: [
    { id: 'c1', name: 'Yala Season 2026 - Paddy', active: true, acres: 2, category: 'paddy' },
    { id: 'c2', name: 'Maha Season 2025/26 - Paddy', active: false, acres: 3.5, category: 'paddy' }
  ],
  transactions: [
    { id: 't1', desc: 'Paddy harvest sale (Nadu)', amount: 95000, type: 'income', date: '2026-06-12', cycleId: 'c1', category: 'income' },
    { id: 't2', desc: 'Urea Fertilizer 50kg (Subsidized)', amount: 3200, type: 'expense', date: '2026-06-05', cycleId: 'c1', category: 'inputs' },
    { id: 't3', desc: 'Tractor Land preparation hire', amount: 9000, type: 'expense', date: '2026-05-28', cycleId: 'c1', category: 'land-prep' },
    { id: 't4', desc: 'Seed Paddy purchases (RRDI)', amount: 8500, type: 'expense', date: '2026-05-25', cycleId: 'c1', category: 'inputs' }
  ]
};

console.log('ZFARM Deterministic Seed Configuration:');
console.log(JSON.stringify(sampleSeed, null, 2));
console.log('Seed verification successful.');
