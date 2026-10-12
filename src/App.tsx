import React from 'react';
import { useApp } from './context/AppContext';
import { Showcase } from './components/layout/Showcase';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/layout/Toast';

// Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { ProductsScreen } from './components/screens/ProductsScreen';
import { ScannerScreen } from './components/screens/ScannerScreen';
import { MarketScreen } from './components/screens/MarketScreen';
import { LedgerScreen } from './components/screens/LedgerScreen';
import { MoreScreen } from './components/screens/MoreScreen';
import { KnowledgeScreen } from './components/screens/KnowledgeScreen';
import { SchemesScreen } from './components/screens/SchemesScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { ExpertScreen } from './components/screens/ExpertScreen';
import { GrievanceScreen } from './components/screens/GrievanceScreen';
import { WeatherScreen } from './components/screens/WeatherScreen';
import { FinanceScreen } from './components/screens/FinanceScreen';
import { EquipmentScreen } from './components/screens/EquipmentScreen';

// Modals
import { AddCycleModal } from './components/modals/AddCycleModal';
import { AddTransactionModal } from './components/modals/AddTransactionModal';
import { AddStockModal } from './components/modals/AddStockModal';
import { OcrScannerModal } from './components/modals/OcrScannerModal';
import { SellProductModal } from './components/modals/SellProductModal';
import { BookEquipmentModal } from './components/modals/BookEquipmentModal';
import { ListingDetailModal } from './components/modals/ListingDetailModal';
import { DiscussionDetailModal } from './components/modals/DiscussionDetailModal';
import { NewDiscussionModal } from './components/modals/NewDiscussionModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { LessonReaderModal } from './components/modals/LessonReaderModal';
import { ProfileModal } from './components/modals/ProfileModal';

export const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <Showcase>
      <Toast />
      <Header />

      {/* SCROLLABLE SCREEN WORKSPACE */}
      <div className="scroll-container">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'products' && <ProductsScreen />}
        {activeTab === 'scanner' && <ScannerScreen />}
        {activeTab === 'market' && <MarketScreen />}
        {activeTab === 'ledger' && <LedgerScreen />}
        {activeTab === 'more' && <MoreScreen />}
        {activeTab === 'knowledge' && <KnowledgeScreen />}
        {activeTab === 'schemes' && <SchemesScreen />}
        {activeTab === 'community' && <CommunityScreen />}
        {activeTab === 'expert' && <ExpertScreen />}
        {activeTab === 'grievance' && <GrievanceScreen />}
        {activeTab === 'weather-advisory' && <WeatherScreen />}
        {activeTab === 'finance' && <FinanceScreen />}
        {activeTab === 'equipment' && <EquipmentScreen />}
      </div>

      <BottomNav />

      {/* ALL 12 MODALS */}
      <AddCycleModal />
      <AddTransactionModal />
      <AddStockModal />
      <OcrScannerModal />
      <SellProductModal />
      <BookEquipmentModal />
      <ListingDetailModal />
      <DiscussionDetailModal />
      <NewDiscussionModal />
      <NotificationsModal />
      <LessonReaderModal />
      <ProfileModal />
    </Showcase>
  );
};
