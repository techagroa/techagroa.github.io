import React from 'react';
import { useApp } from '../../context/AppContext';
import { LOANS } from '../../data/loansData';
import { INSURANCE } from '../../data/insuranceData';

export const FinanceScreen: React.FC = () => {
  const { setActiveTab, financeTab, setFinanceTab, t } = useApp();

  const items = financeTab === 'loans' ? LOANS : INSURANCE;

  return (
    <div className="screen active" id="screen-finance">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
        <span className="bold" style={{ fontSize: '15px' }}>{t('financeTitle', 'Loans & Insurance')}</span>
      </div>

      <div className="role-switcher-container">
        <button
          className={`role-tab ${financeTab === 'loans' ? 'active' : ''}`}
          id="ftab-loans"
          onClick={() => setFinanceTab('loans')}
        >
          {t('tabLoans', 'Loans')}
        </button>
        <button
          className={`role-tab ${financeTab === 'insurance' ? 'active' : ''}`}
          id="ftab-ins"
          onClick={() => setFinanceTab('insurance')}
        >
          {t('tabInsurance', 'Insurance')}
        </button>
      </div>

      <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
        {t('financeNote', 'Indicative information only. Confirm rates, eligibility and contact numbers with the institution.')}
      </div>

      <div id="finance-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, idx) => (
          <div key={idx} className="card">
            <div className="card-title-row">
              <span className="card-title" style={{ fontSize: '14px' }}>
                {item.icon} {item.title}
              </span>
              <span className="pill pill-green" style={{ fontSize: '10px' }}>
                {(item as any).rate}
              </span>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--primary-dark)', fontWeight: 600 }}>
              {(item as any).inst}
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-dark)', lineHeight: 1.4 }}>
              {item.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '2px' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t('maxLbl', 'Max amount')}: </span>
                <strong style={{ fontSize: '12px', color: 'var(--primary-green)' }}>{(item as any).max}</strong>
              </div>

              <a
                href={`tel:${(item as any).contact}`}
                className="btn btn-secondary btn-sm"
                style={{ width: 'auto', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <i className="ti ti-phone"></i> {t('callBtn', 'Call')} {(item as any).contact}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
