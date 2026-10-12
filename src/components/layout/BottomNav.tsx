import React from 'react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
        id="nav-btn-home"
        onClick={() => setActiveTab('home')}
      >
        <i className="ti ti-home"></i>
        <span>{t('navHome', 'Home')}</span>
      </button>

      <button
        className={`nav-btn ${activeTab === 'market' ? 'active' : ''}`}
        id="nav-btn-market"
        onClick={() => setActiveTab('market')}
      >
        <i className="ti ti-building-store"></i>
        <span>{t('navMarket', 'Market')}</span>
      </button>

      <button
        className={`nav-btn nav-btn-center ${activeTab === 'products' ? 'active' : ''}`}
        id="nav-btn-products"
        onClick={() => setActiveTab('products')}
      >
        <div className="nav-center-circle">
          <i className="ti ti-package"></i>
        </div>
        <span style={{ marginTop: '2px' }}>{t('navProducts', 'My Products')}</span>
      </button>

      <button
        className={`nav-btn ${activeTab === 'ledger' ? 'active' : ''}`}
        id="nav-btn-ledger"
        onClick={() => setActiveTab('ledger')}
      >
        <i className="ti ti-report-money"></i>
        <span>{t('navLedger', 'Ledger')}</span>
      </button>

      <button
        className={`nav-btn ${activeTab === 'more' ? 'active' : ''}`}
        id="nav-btn-more"
        onClick={() => setActiveTab('more')}
      >
        <i className="ti ti-menu"></i>
        <span>{t('navMore', 'More')}</span>
      </button>
    </nav>
  );
};
