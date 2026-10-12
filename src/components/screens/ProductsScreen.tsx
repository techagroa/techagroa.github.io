import React from 'react';
import { useApp } from '../../context/AppContext';

export const ProductsScreen: React.FC = () => {
  const {
    marketplaceProducts,
    user,
    openModal,
    deleteListing,
    toggleSoldListing,
    t
  } = useApp();

  // Filter listings belonging to current signed-in user or demo farmer
  const myListings = marketplaceProducts.filter(
    p => p.ownerId === user.id || p.vendor === user.name
  );

  return (
    <div className="screen active" id="screen-products">
      <div className="flex-row-between" style={{ marginBottom: '12px' }}>
        <span className="bold" style={{ fontSize: '16px' }}>{t('navProducts', 'My Products')}</span>
        <button
          className="btn btn-primary btn-sm"
          style={{ width: 'auto' }}
          onClick={() => openModal('modal-sell-crop')}
        >
          <i className="ti ti-plus"></i> <span>{t('addProduct', 'Add product')}</span>
        </button>
      </div>

      <div id="my-products-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {myListings.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '30px 20px' }}>
            <span style={{ fontSize: '42px', display: 'block', marginBottom: '10px' }}>📦</span>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>No Listings Published Yet</div>
            <p className="card-subtitle" style={{ marginBottom: '16px' }}>
              Publish your harvest, vegetables, or farm items to connect directly with wholesale buyers and consumers across Sri Lanka.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: 'auto', margin: '0 auto' }}
              onClick={() => openModal('modal-sell-crop')}
            >
              <i className="ti ti-plus"></i> Sell Your First Product
            </button>
          </div>
        ) : (
          myListings.map(p => (
            <div
              key={p.id}
              className="card"
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                opacity: p.isSold ? 0.65 : 1,
                border: p.isSold ? '1px dashed var(--border-color)' : '1px solid var(--border-color)'
              }}
            >
              {/* Product Photo / Icon */}
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--background-slate)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0
                }}
              >
                {p.photo ? (
                  <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '32px' }}>{p.icon || '🥬'}</span>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-dark)' }}>{p.name}</div>
                    <span className={`pill ${p.isSold ? 'pill-orange' : 'pill-green'}`}>
                      {p.isSold ? 'Sold' : 'Active'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-green)', marginTop: '2px' }}>
                    LKR {p.price.toLocaleString()} <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>/ {p.unit || 'kg'}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {p.district || user.district} · {p.category}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, padding: '4px 8px', fontSize: '11px' }}
                    onClick={() => toggleSoldListing(p.id)}
                  >
                    {p.isSold ? 'Reactivate' : 'Mark Sold'}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ width: 'auto', padding: '4px 8px', color: 'var(--destructive-red)' }}
                    onClick={() => {
                      if (window.confirm(`Delete listing "${p.name}"?`)) {
                        deleteListing(p.id);
                      }
                    }}
                    title="Delete listing"
                  >
                    <i className="ti ti-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
