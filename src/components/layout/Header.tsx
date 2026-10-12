import React from 'react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t, openModal, notifications } = useApp();

  const toggleLang = () => {
    if (language === 'en') setLanguage('si');
    else if (language === 'si') setLanguage('ta');
    else setLanguage('en');
  };

  const hasUnread = notifications.some(n => !n.isRead);

  return (
    <>
      {/* STATUS BAR */}
      <div className="status-bar">
        <span className="status-bar-time">9:41</span>
        <div className="status-bar-icons">
          <i className="ti ti-wifi"></i>
          <i className="ti ti-circle-filled" style={{ color: 'var(--secondary-accent)', fontSize: '6px' }}></i>
          <i className="ti ti-battery-4"></i>
        </div>
      </div>

      {/* APP HEADER */}
      <div className="app-header">
        <div className="header-top">
          <div className="header-branding">
            <div className="header-logo-row">
              <div className="header-logo">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTQwIDYwIEw2MCA0MCBMNDAgMjAgTDIwIDQwIFoiIGZpbGw9IiMyRDZBNEYiLz48cGF0aCBkPSJNNjAgNDAgTDgwIDYwIEw2MCA4MCBMNDAgNjAgWiIgZmlsbD0iIzUyQjc4OCIvPjxwYXRoIGQ9Ik01MCA1MCBMNjUgMzUgTDUwIDIwIEwzNSAzNSBaIiBmaWxsPSIjZmZmIi8+PC9zdmc+"
                  alt="logo"
                />
              </div>
              <span className="header-title">{t('appTitle', 'ZFARM')}</span>
            </div>
            <span className="header-subtitle">{t('appSubtitle', 'Empowering Sri Lankan Farmers')}</span>
          </div>

          <div className="header-actions">
            <button className="lang-toggle" onClick={toggleLang} title="Toggle English / Sinhala / Tamil">
              <i className="ti ti-language"></i>
              <span id="lang-btn-txt">{language.toUpperCase()}</span>
            </button>
            <button
              className="header-icon-btn"
              onClick={() => openModal('modal-notifications')}
              title="Notifications"
            >
              <i className="ti ti-bell"></i>
              {hasUnread && <span className="badge-dot" id="bell-dot"></span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
