import React from 'react';
import { useApp } from '../../context/AppContext';
import { MarketplaceProduct } from '../../types';

export const MarketScreen: React.FC = () => {
  const {
    marketplaceProducts,
    marketRole,
    setMarketRole,
    marketCategory,
    setMarketCategory,
    marketSearch,
    setMarketSearch,
    setSelectedListing,
    setSelectedEquipment,
    openModal,
    setActiveTab,
    t
  } = useApp();

  // Filters depending on active role
  const getFilterChips = () => {
    if (marketRole === 'farmer') {
      return [
        { id: 'all', label: 'All' },
        { id: 'inputs', label: 'Buy Inputs' },
        { id: 'machinery', label: 'Machinery Rentals' },
        { id: 'vegetables', label: 'Vegetables' },
        { id: 'fruits', label: 'Fruits' },
        { id: 'farm-items', label: 'Farm Items' },
        { id: 'b2b-requests', label: 'Wholesale Orders' }
      ];
    } else if (marketRole === 'business') {
      return [
        { id: 'all', label: 'All' },
        { id: 'bulk-inputs', label: 'Bulk Input Supply' },
        { id: 'machinery', label: 'Logistics & Machinery' }
      ];
    } else {
      return [
        { id: 'all', label: 'All' },
        { id: 'subsidies', label: 'Subsidies' },
        { id: 'tenders', label: 'Tenders & Bidding' }
      ];
    }
  };

  // Filter products
  const filteredProducts = marketplaceProducts.filter(p => {
    // Search query match
    if (marketSearch.trim()) {
      const q = marketSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchVendor = p.vendor.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchVendor && !matchCat) return false;
    }

    // Category chip filter
    if (marketCategory !== 'all') {
      if (marketCategory === 'inputs' && p.category !== 'inputs') return false;
      if (marketCategory === 'machinery' && p.category !== 'machinery') return false;
      if (marketCategory === 'vegetables' && p.category !== 'vegetables') return false;
      if (marketCategory === 'fruits' && p.category !== 'fruits') return false;
      if (marketCategory === 'farm-items' && p.category !== 'farm-items') return false;
      if (marketCategory === 'subsidies' && !p.isSubsidized) return false;
    }

    // Role filtering view
    if (marketRole === 'state') {
      return p.isSubsidized || p.category === 'subsidies' || p.category === 'inputs';
    }

    return true;
  });

  const handleCardClick = (p: MarketplaceProduct) => {
    if (p.category === 'machinery') {
      // Machinery rental: open equipment booking
      setSelectedEquipment({
        name: p.name,
        supplier: p.vendor,
        rent: p.price,
        location: p.district || 'Polonnaruwa',
        icon: '🚜'
      });
      openModal('modal-book-equip');
    } else {
      setSelectedListing(p);
      openModal('modal-listing');
    }
  };

  return (
    <div className="screen active" id="screen-market">
      {/* 9-Sided Role Toggle */}
      <div className="role-switcher-container">
        <button
          className={`role-tab ${marketRole === 'farmer' ? 'active' : ''}`}
          onClick={() => {
            setMarketRole('farmer');
            setMarketCategory('all');
          }}
        >
          Farmer View (C2C/C2B/C2G)
        </button>
        <button
          className={`role-tab ${marketRole === 'business' ? 'active' : ''}`}
          onClick={() => {
            setMarketRole('business');
            setMarketCategory('all');
          }}
        >
          Business View (B2B/B2C/B2G)
        </button>
        <button
          className={`role-tab ${marketRole === 'state' ? 'active' : ''}`}
          onClick={() => {
            setMarketRole('state');
            setMarketCategory('all');
          }}
        >
          State View (G2C/G2B)
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card" style={{ padding: '12px', gap: '8px' }}>
        <div className="input-wrapper">
          <i className="ti ti-search"></i>
          <input
            type="text"
            className="input-field"
            id="market-search"
            placeholder="Search inputs, machinery, crops..."
            value={marketSearch}
            onChange={e => setMarketSearch(e.target.value)}
          />
        </div>

        <div className="catalog-filters" id="market-filter-tabs">
          {getFilterChips().map(chip => (
            <div
              key={chip.id}
              className={`filter-chip ${marketCategory === chip.id ? 'active' : ''}`}
              onClick={() => setMarketCategory(chip.id)}
            >
              {chip.label}
            </div>
          ))}
        </div>
      </div>

      {/* B2B Buyer Requests Banner */}
      {marketRole === 'farmer' && (
        <div
          className="alert-banner"
          style={{ background: '#FFF8E1', borderColor: '#FFB300', cursor: 'pointer' }}
          id="buyer-requests-banner"
          onClick={() => setMarketCategory('b2b-requests')}
        >
          <i className="ti ti-layout-grid-add" style={{ color: '#FFB300' }}></i>
          <div className="alert-content" style={{ flex: 1 }}>
            <strong><span>{t('buyerRequests', 'B2B Buyer Requests')}</span></strong><br />
            <span>{t('buyerRequestsAd', 'Corporate wholesale aggregators are sourcing crops in Polonnaruwa. View feed.')}</span>
          </div>
          <i className="ti ti-chevron-right" style={{ color: '#FFB300', alignSelf: 'center' }}></i>
        </div>
      )}

      {/* Products Grid */}
      <div className="marketplace-grid" id="market-grid-container">
        {filteredProducts.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '30px 10px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No marketplace items found matching criteria.
          </div>
        ) : (
          filteredProducts.map(p => (
            <div
              key={p.id}
              className="market-card"
              onClick={() => handleCardClick(p)}
              style={{ cursor: 'pointer' }}
            >
              <div className="market-card-img">
                {p.photo ? (
                  <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '32px' }}>{p.icon || '📦'}</span>
                )}
                {p.badge && <span className="market-badge">{p.badge}</span>}
              </div>

              <div className="market-card-body">
                <div className="market-title">{p.name}</div>
                <div className="market-price">
                  LKR {p.price.toLocaleString()}
                  <span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-muted)' }}>
                    {' '}/ {p.unit || 'unit'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>{p.vendor}</span>
                  {p.rating && <span>⭐ {p.rating}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        className="btn btn-outline"
        style={{ border: '1.5px solid var(--primary-green)', color: 'var(--primary-green)', background: '#fff' }}
        onClick={() => openModal('modal-sell-crop')}
      >
        <i className="ti ti-speakerphone"></i> <span>{t('sellProduct', 'Sell your products')}</span>
      </button>
    </div>
  );
};
