import React from 'react';
import { useApp } from '../../context/AppContext';
import { EQUIPMENT } from '../../data/equipmentData';

export const EquipmentScreen: React.FC = () => {
  const {
    setActiveTab,
    equipmentMode,
    setEquipmentMode,
    setSelectedEquipment,
    openModal,
    t
  } = useApp();

  const handleBook = (eq: any) => {
    setSelectedEquipment(eq);
    openModal('modal-book-equip');
  };

  return (
    <div className="screen active" id="screen-equipment">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
        <span className="bold" style={{ fontSize: '15px' }}>{t('equipCentre', 'Equipment Centre')}</span>
      </div>

      {/* Mode Switcher */}
      <div className="role-switcher-container" id="equip-mode-switcher">
        <button
          className={`role-tab ${equipmentMode === 'rent' ? 'active' : ''}`}
          onClick={() => setEquipmentMode('rent')}
        >
          Rental Catalog
        </button>
        <button
          className={`role-tab ${equipmentMode === 'buy' ? 'active' : ''}`}
          onClick={() => setEquipmentMode('buy')}
        >
          Purchase Catalog
        </button>
      </div>

      {/* Machinery List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} id="equip-list-container">
        {EQUIPMENT.map((eq, idx) => {
          if (equipmentMode === 'buy' && !eq.buy) {
            return null; // Skip items not available for direct purchase
          }

          return (
            <div key={idx} className="card">
              <div className="card-title-row">
                <span className="card-title" style={{ fontSize: '14px' }}>
                  {eq.icon} {eq.name}
                </span>
                <span className="pill pill-green" style={{ fontSize: '10px' }}>
                  {eq.cat}
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-dark)', lineHeight: 1.4 }}>
                {eq.desc}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <div>
                  {equipmentMode === 'rent' ? (
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t('rentLbl', 'Rent / day')}: </span>
                      <strong style={{ fontSize: '14px', color: 'var(--primary-green)' }}>
                        LKR {eq.rent?.toLocaleString()}
                      </strong>
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t('buyLbl', 'Buy')}: </span>
                      <strong style={{ fontSize: '14px', color: 'var(--primary-green)' }}>
                        LKR {eq.buy?.toLocaleString()}
                      </strong>
                    </div>
                  )}
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    📍 {eq.location} · {eq.supplier}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <a
                    href={`tel:${eq.phone}`}
                    className="btn btn-secondary btn-sm"
                    style={{ width: 'auto', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    title="Call Supplier"
                  >
                    <i className="ti ti-phone"></i>
                  </a>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: 'auto' }}
                    onClick={() => handleBook(eq)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
