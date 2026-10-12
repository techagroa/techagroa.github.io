# ZFARM — Sri Lanka Smart Agriculture Platform

A mobile-first web application and Progressive Web App (PWA) engineered to empower Sri Lankan farmers across all 25 districts. ZFARM digitizes the agricultural lifecycle from cultivation cycles and disease diagnostics to marketplace trade and state grievance redressal.

Built with **React 18**, **TypeScript**, **Vite**, and **IndexedDB** (`idb`), styled with exact design tokens extracted directly from the authoritative reference `zfarm-improved.html`.

---

## 1. Quick Start & Execution

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on Node.js v24)
- npm

### Installation & Running Locally
```powershell
# 1. Install dependencies
npm.cmd install

# 2. Start the development server (runs with hot module reloading)
npm.cmd run dev

# 3. Build for production (TypeScript check + Vite production bundle)
npm.cmd run build

# 4. Preview production build
npm.cmd run preview
```

The application runs locally at: **http://localhost:5173/**

---

## 2. Operating Modes (Dual-Mode Architecture)

ZFARM implements two explicitly separated modes:

### A. Local Demo Mode (Default, Zero Credentials)
- **Runs instantly out of the box** without any external API keys or cloud setup.
- Backed by high-performance **IndexedDB** (`zfarm_database_v1`) with full offline persistence across browser reloads.
- Pre-populated with deterministic Sri Lankan agricultural data:
  - Polonnaruwa Nadu Paddy cultivation records (Yala Season 2026).
  - Crop stock reserves with kg-to-Metric Ton national map aggregation.
  - Multi-category ledger with land prep, inputs, labor, and harvest breakdown.
  - GoviyaAI agronomy expert responses with reviewed Department of Agriculture (DOA) citations.
  - Receipt OCR scanner with interactive verification before committing.

### B. Connected Mode (Cloud Backend)
- Integrates **Firebase Authentication**, **Cloud Firestore**, and **Firebase Storage**.
- Server-side AI endpoint boundary (`VITE_GOVIYA_AI_API_ENDPOINT`) for private credential protection.
- To enable Connected Mode, update `.env` using `.env.example`:
  ```bash
  cp .env.example .env
  ```
- Configure your Firebase project parameters in `.env` and switch to Connected Mode from the Profile dialog.

---

## 3. Feature Traceability & Implementation Status

| Screen / Feature | Reference Screen ID | Implementation Status | Data Source / Engine |
|---|---|---|---|
| **Home** | `screen-home` | ✅ Fully Working | District Weather, Pest Alerts, 8 Quick Shortcuts, SVG Crop Map (with MT aggregation), My Stock List |
| **My Products** | `screen-products` | ✅ Fully Working | User-owned listings, Mark Sold/Reactivate, Delete with confirmation, Sell Harvest Sheet |
| **Marketplace** | `screen-market` | ✅ Fully Working | 9-Sided Role Switcher (Farmer/Business/State), 2-Column Cards, Search, Filters, Inquire/Buy Request |
| **Ledger** | `screen-ledger` | ✅ Fully Working | Total Balance Hero, Cultivation Cycles, Dynamic Expense Breakdown (% bars), Transaction Source-of-Truth |
| **Receipt Scanner** | `modal-ocr-scanner` | ✅ Fully Working | Camera upload / Sample slips, OCR scanning animation, User-editable review before ledger save |
| **Plant Scanner** | `screen-scanner` | ✅ Fully Working | Camera viewfinder, Laser scan animation, Structured diagnosis (Severity, Symptoms, Recovery), Offline Library |
| **Knowledge Hub** | `screen-knowledge` | ✅ Fully Working | Interactive Learning Tracks (`loadLesson` modal), Real PDF manual download, Real Audio voice guide |
| **Government Schemes** | `screen-schemes` | ✅ Fully Working | Fertilizer Subsidy, Bank Loans, Housing Credit, Crop Insurance with direct `tel:` helpline links |
| **Farmers Community** | `screen-community` | ✅ Fully Working | Trilingual Q&A Forum, 25 Districts across 9 Provinces, Post composer (Question/Tip/Price/Alert), Helpful votes, Report with undo |
| **GoviyaAI Chat** | `screen-expert` | ✅ Fully Working | Multi-turn chat, Sinhala/Tamil/English speech input, Speech synthesis (TTS), Reviewed DOA citations |
| **Grievance Hub** | `screen-grievance` | ✅ Fully Working | Agrarian Center selection, Issue Category, GPS telemetry capture, Persistent Ref IDs & Status History |
| **Weather & Advisory** | `screen-weather-advisory` | ✅ Fully Working | 5-Day forecast grid, Asia/Colombo observation times, Maha & Yala Cultivation Calendar Matrix |
| **Loans & Insurance** | `screen-finance` | ✅ Fully Working | Bank loans (BOC, PB, RDB) & Crop insurance discovery with indicative disclosure and contact links |
| **Equipment Hub** | `screen-equipment` | ✅ Fully Working | Tractors, Harvesters, Irrigation rental & purchase catalog with offline booking request sheet |

---

## 4. All 10 Dialog & Bottom Sheet Modals Reachable

1. `modal-add-cycle`: Start New Cultivation Cycle (Season, Category, Variety, Acreage).
2. `modal-add-txn`: Log Financial Transaction (Income/Expense toggle, Description, Amount, Category).
3. `modal-add-stock`: Add Crop Stock to Reserve (Variety, District, Quantity in kg, Days to harvest).
4. `modal-ocr-scanner`: Receipt OCR Scanner with parsed data review.
5. `modal-sell-crop`: Sell Harvest / Publish Listing with photo compression.
6. `modal-book-equip`: Book Agriculture Machinery with estimated cost calculator.
7. `modal-listing`: Marketplace Listing Detail with Wholesale / Purchase request flow.
8. `modal-discussion`: Discussion Thread with reply stream and author deletion.
9. `modal-new-disc`: Start New Discussion (Categories, Title, Description).
10. `modal-notifications`: Alerts & Circulars center with unread indicator and "Mark all read".
11. `modal-lesson`: Interactive Lesson Reader with curriculum, key takeaways, and completion tracking.
12. `modal-profile`: Farmer profile manager and Local Demo / Connected Mode toggle.

---

## 5. Security & Firebase Setup

Backend rules and index configurations are provided in the project root:
- `firebase.rules`: Enforces strict per-user ownership on private ledgers, grievances, and chats; public read access for marketplace and community posts; officer-only moderation.
- `storage.rules`: Validates file sizes (<5MB for public photos, <10MB for receipts) and restricts private document access.
- `firestore.indexes.json`: Optimized compound indexes for marketplace and community feeds.
- `scripts/seed.js`: Deterministic data seeder for Firebase Emulator.

### Running Firebase Local Emulator
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Start emulators
firebase emulators:start --only firestore,storage,auth
```

---

## 6. Authoritative Reference Preservation

The original `zfarm-improved.html` reference file is preserved untouched at:
`c:\Users\arwin\Documents\Z Farm app 1\zfarm-improved.html`
