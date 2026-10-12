import React from 'react';
import { useApp } from '../../context/AppContext';
import { govSchemesMatrix } from '../../data/govSchemes';

export const SchemesScreen: React.FC = () => {
  const { setActiveTab, language, showToast, t } = useApp();

  const handleApply = (schemeTitle: string) => {
    showToast(`Application draft for "${schemeTitle}" created in ZFARM. Contact helpline to submit documentation.`);
  };

  return (
    <div className="screen active" id="screen-schemes">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
        <span className="bold" style={{ fontSize: '15px' }}>{t('govSchemes', 'Government Schemes')}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} id="schemes-matrix-container">
        {govSchemesMatrix.map(scheme => {
          const title = (scheme.title as any)[language] || scheme.title.en;
          const dept = (scheme.dept as any)[language] || scheme.dept.en;
          const benefit = (scheme.benefit as any)[language] || scheme.benefit.en;

          return (
            <div key={scheme.id} className="card">
              <div className="card-title-row">
                <span className="card-title">
                  <i className="ti ti-building-bank"></i> {title}
                </span>
                <span className="badge badge-green">Open</span>
              </div>

              <div style={{ fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>
                  <strong>Department:</strong> {dept}
                </div>
                <div>
                  <strong>Allocated Benefit:</strong> {benefit}
                </div>
                <div>
                  <strong>Official Helpline:</strong>{' '}
                  <a
                    href={`tel:${scheme.contact}`}
                    style={{ color: 'var(--primary-green)', fontWeight: 700, textDecoration: 'none' }}
                  >
                    {scheme.contact}
                  </a>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ marginTop: '8px' }}
                onClick={() => handleApply(title)}
              >
                Apply / Inquire Application Status
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
