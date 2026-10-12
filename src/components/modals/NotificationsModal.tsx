import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    t
  } = useApp();

  if (activeModal !== 'modal-notifications') return null;

  return (
    <div className="modal-overlay active" id="modal-notifications" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet" style={{ height: '80%', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header">
          <span className="modal-title">
            <i className="ti ti-bell"></i> {t('alertsTitle', 'Alerts')}
          </span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          style={{ width: 'auto', alignSelf: 'flex-end', marginBottom: '8px' }}
          onClick={markAllNotificationsRead}
        >
          {t('markAllRead', 'Mark all read')}
        </button>

        <div id="alerts-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: n.isRead ? 'var(--card-surface)' : 'var(--primary-green-light)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <span style={{ fontSize: '24px' }}>{n.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>
                    {n.title}
                  </span>
                  {!n.isRead && (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-green)' }}></span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  {n.body}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {n.h} hours ago · Official Department Circular
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
