import React from 'react';
import { useApp } from '../../context/AppContext';

export const MoreScreen: React.FC = () => {
  const { user, updateUser, setActiveTab, openModal, showToast, t } = useApp();

  const handleTogglePremium = () => {
    const nextVal = !user.isPremium;
    updateUser({ isPremium: nextVal });
    showToast(nextVal ? 'Premium preview enabled (Demo tier)' : 'Standard tier selected');
  };

  return (
    <div className="screen active" id="screen-more">
      {/* Profile Card */}
      <div
        className="card"
        style={{ flexDirection: 'row', alignItems: 'center', gap: '14px', padding: '12px', cursor: 'pointer' }}
        onClick={() => openModal('modal-profile')}
        title="Tap to edit profile or toggle Demo/Connected Mode"
      >
        <div
          className="profile-avatar"
          style={{
            fontSize: '36px',
            width: '64px',
            height: '64px',
            background: 'var(--primary-green-light)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--primary-green)'
          }}
        >
          👨‍🌾
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{user.name}</h3>
            <i className="ti ti-edit" style={{ color: 'var(--primary-green)', fontSize: '16px' }}></i>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            📍 {user.district} · <span>{t('paddyFarmer', 'Paddy Farmer')}</span>
          </span>
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
            <span className="badge badge-green">Reputation: {user.reputation}</span>
            {user.isPremium && <span className="badge badge-warm">Premium</span>}
            <span className="badge" style={{ background: '#E3F2FD', color: '#1565C0' }}>
              {user.mode === 'demo' ? 'Local Demo' : 'Connected'}
            </span>
          </div>
        </div>
      </div>

      {/* 9 Service Buttons Grid */}
      <div className="service-grid">
        <div className="service-item-btn" onClick={() => setActiveTab('knowledge')}>
          <i className="ti ti-book-2"></i>
          <span className="service-item-title">{t('knowledgeHub', 'Knowledge Hub')}</span>
          <span className="service-item-desc">{t('knowledgeDesc', 'Offline PDF agricultural manuals, training courses.')}</span>
        </div>

        <div className="service-item-btn" onClick={() => setActiveTab('schemes')}>
          <i className="ti ti-building-bank"></i>
          <span className="service-item-title">{t('govSchemes', 'Gov Schemes')}</span>
          <span className="service-item-desc">{t('schemesDesc', 'Ministry fertilizer subsidies & BOC crop banking loans.')}</span>
        </div>

        <div className="service-item-btn" onClick={() => setActiveTab('expert')}>
          <i className="ti ti-message-chatbot"></i>
          <span className="service-item-title">{t('aiExpert', 'AI Expert Chat')}</span>
          <span className="service-item-desc">{t('expertDesc', 'Interactive RAG agronomy chat with speech play.')}</span>
        </div>

        <div className="service-item-btn" onClick={() => setActiveTab('grievance')}>
          <i className="ti ti-mail-exclamation"></i>
          <span className="service-item-title">{t('grievance', 'Grievance Hub')}</span>
          <span className="service-item-desc">{t('grievanceDesc', 'Official state Agrarian Development complaint portal.')}</span>
        </div>

        <div className="service-item-btn" onClick={() => setActiveTab('weather-advisory')}>
          <i className="ti ti-cloud-storm"></i>
          <span className="service-item-title">{t('weather', 'Weather & Advisory')}</span>
          <span className="service-item-desc">{t('weatherDesc', 'Hyperlocal weather & Maha/Yala farming calendar.')}</span>
        </div>

        <div className="service-item-btn" onClick={() => setActiveTab('scanner')}>
          <i className="ti ti-camera-search"></i>
          <span className="service-item-title">{t('scanTitle', 'AI Plant Disease Scanner')}</span>
          <span className="service-item-desc">{t('scanHint', 'Scan plant leaves for early disease, pest, and nutrient deficiency detection.')}</span>
        </div>

        <div className="service-item-btn" onClick={() => setActiveTab('community')}>
          <i className="ti ti-users-group"></i>
          <span className="service-item-title">{t('farmersCommunity', 'Farmers Community')}</span>
          <span className="service-item-desc">{t('communityDesc', 'Connect with farmers in your district and across Sri Lanka.')}</span>
        </div>

        <div className="service-item-btn" onClick={() => setActiveTab('finance')}>
          <i className="ti ti-building-bank"></i>
          <span className="service-item-title">{t('financeTitle', 'Loans & Insurance')}</span>
          <span className="service-item-desc">{t('financeDesc', 'Loan and crop insurance options for farmers.')}</span>
        </div>

        <div className="service-item-btn" onClick={() => setActiveTab('equipment')}>
          <i className="ti ti-tractor"></i>
          <span className="service-item-title">{t('equipCentre', 'Equipment Hub')}</span>
          <span className="service-item-desc">{t('equipDesc', 'Tractors and harvesters database and bookings.')}</span>
        </div>
      </div>

      {/* Settings / Monetization Section */}
      <div className="card">
        <span className="card-title">
          <i className="ti ti-settings"></i> {t('settings', 'Settings')}
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div className="stock-item" style={{ border: 'none', borderBottom: '1px solid var(--border-color)', borderRadius: 0 }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600 }}>
              <i className="ti ti-award"></i> {t('premiumAccounting', 'Premium Accounting Tier')}
            </span>
            <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
              <input
                type="checkbox"
                id="premium-toggle"
                checked={user.isPremium}
                onChange={handleTogglePremium}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                className="slider"
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: user.isPremium ? 'var(--primary-green)' : '#ccc',
                  transition: '.4s',
                  borderRadius: '34px'
                }}
              ></span>
            </label>
          </div>

          <div className="stock-item" style={{ border: 'none', borderRadius: 0, padding: '10px 4px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            <span>{t('premiumDetail', 'LKR 200/month unlocks unlimited ledger logs, predictive harvest accounting analytics, and official agrarian credit report export formats.')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
