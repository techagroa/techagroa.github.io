import React from 'react';
import { useApp } from '../../context/AppContext';

export const LedgerScreen: React.FC = () => {
  const {
    ledgerCycles,
    activeCycleId,
    setActiveCycleId,
    transactions,
    deleteTransaction,
    loans,
    openModal,
    setActiveTab,
    t
  } = useApp();

  const activeCycle = ledgerCycles.find(c => c.id === activeCycleId) || ledgerCycles[0];

  // Transactions for current cycle
  const cycleTxns = transactions.filter(t => t.cycleId === activeCycle?.id);

  // Accounting source of truth calculation
  const totalIncome = cycleTxns
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = cycleTxns
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Breakdown
  const landPrepExp = cycleTxns
    .filter(t => t.category === 'land-prep')
    .reduce((sum, t) => sum + t.amount, 0);

  const inputsExp = cycleTxns
    .filter(t => t.category === 'inputs')
    .reduce((sum, t) => sum + t.amount, 0);

  const laborExp = cycleTxns
    .filter(t => t.category === 'labor')
    .reduce((sum, t) => sum + t.amount, 0);

  const harvestExp = cycleTxns
    .filter(t => t.category === 'harvest')
    .reduce((sum, t) => sum + t.amount, 0);

  const safeTotalExp = totalExpense > 0 ? totalExpense : 1;
  const pctLand = Math.round((landPrepExp / safeTotalExp) * 100);
  const pctInputs = Math.round((inputsExp / safeTotalExp) * 100);
  const pctLabor = Math.round((laborExp / safeTotalExp) * 100);
  const pctHarvest = Math.round((harvestExp / safeTotalExp) * 100);

  return (
    <div className="screen active" id="screen-ledger">
      {/* Total Balance Hero Card */}
      <div className="ledger-header-card">
        <span className="ledger-header-label">{t('totalNetBalance', 'Total Net Balance')}</span>
        <span className="ledger-header-val" id="ledger-net-val">
          {netBalance >= 0 ? '' : '-'}LKR {Math.abs(netBalance).toLocaleString()}
        </span>
        <div className="ledger-stats-sub">
          <div className="ledger-sub-stat">
            <span className="ledger-sub-label">{t('income', 'Income')}</span>
            <span className="ledger-sub-val" id="ledger-income-val" style={{ color: 'var(--secondary-accent)' }}>
              +LKR {totalIncome.toLocaleString()}
            </span>
          </div>
          <div className="ledger-sub-stat">
            <span className="ledger-sub-label">{t('expenses', 'Expenses')}</span>
            <span className="ledger-sub-val" id="ledger-expense-val" style={{ color: 'var(--warm-accent)' }}>
              -LKR {totalExpense.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Active Cycle Highlights */}
      <div id="cycle-cards" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {activeCycle && (
          <div className="card" style={{ borderLeft: '4px solid var(--primary-green)' }}>
            <div className="card-title-row">
              <span className="bold" style={{ fontSize: '14px', color: 'var(--text-dark)' }}>
                {activeCycle.name}
              </span>
              <span className="pill pill-green">
                {activeCycle.active ? 'Active Season' : 'Completed'}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Farmed Extent: {activeCycle.acres} Acres · {activeCycle.category?.toUpperCase() || 'PADDY'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Expenses: </span>
                <strong style={{ color: 'var(--destructive-red)' }}>LKR {totalExpense.toLocaleString()}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Revenue: </span>
                <strong style={{ color: 'var(--primary-green)' }}>LKR {totalIncome.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cultivation Cycle Selector */}
      <div className="card">
        <div className="card-title-row">
          <span className="card-title">
            <i className="ti ti-calendar-event"></i> {t('cultivationCycles', 'Cultivation Cycles')}
          </span>
          <button className="btn btn-primary btn-sm" onClick={() => openModal('modal-add-cycle')}>
            <i className="ti ti-plus"></i> <span>{t('newCycle', 'New Cycle')}</span>
          </button>
        </div>
        <div className="input-wrapper">
          <i className="ti ti-plant"></i>
          <select
            className="input-field select-field"
            id="active-cycle-select"
            value={activeCycleId}
            onChange={e => setActiveCycleId(e.target.value)}
          >
            {ledgerCycles.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.acres} ac)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expense Distribution Progress Bars */}
      <div className="card">
        <span className="card-title">
          <i className="ti ti-chart-donut"></i> {t('expenseDistribution', 'Expense Distribution')}
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="progress-bar-row">
            <div className="progress-label-row">
              <span>{t('landPrep', 'Land Preparation')}</span>
              <span id="pct-land-val">{totalExpense > 0 ? `${pctLand}%` : '0%'}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" id="bar-land-fill" style={{ width: `${totalExpense > 0 ? pctLand : 0}%`, background: '#F4A261' }}></div>
            </div>
          </div>

          <div className="progress-bar-row">
            <div className="progress-label-row">
              <span>{t('inputs', 'Inputs (Seeds, Fertilizer)')}</span>
              <span id="pct-inputs-val">{totalExpense > 0 ? `${pctInputs}%` : '0%'}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" id="bar-inputs-fill" style={{ width: `${totalExpense > 0 ? pctInputs : 0}%`, background: 'var(--secondary-accent)' }}></div>
            </div>
          </div>

          <div className="progress-bar-row">
            <div className="progress-label-row">
              <span>{t('laborWages', 'Labor Wages')}</span>
              <span id="pct-labor-val">{totalExpense > 0 ? `${pctLabor}%` : '0%'}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" id="bar-labor-fill" style={{ width: `${totalExpense > 0 ? pctLabor : 0}%`, background: '#1565C0' }}></div>
            </div>
          </div>

          <div className="progress-bar-row">
            <div className="progress-label-row">
              <span>{t('harvestCosts', 'Harvest & Transport')}</span>
              <span id="pct-harvest-val">{totalExpense > 0 ? `${pctHarvest}%` : '0%'}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" id="bar-harvest-fill" style={{ width: `${totalExpense > 0 ? pctHarvest : 0}%`, background: 'var(--primary-green)' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* OCR Slip Scanner Card */}
      <div
        className="card"
        style={{
          border: '1.5px dashed var(--secondary-accent)',
          background: 'var(--primary-green-light)',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
          cursor: 'pointer'
        }}
        onClick={() => openModal('modal-ocr-scanner')}
      >
        <i className="ti ti-scan" style={{ fontSize: '32px', color: 'var(--primary-green)' }}></i>
        <strong style={{ color: 'var(--primary-green)', fontSize: '14px', marginTop: '8px' }}>
          {t('ocrCta', 'Scan Cash Slip (OCR Receipt)')}
        </strong>
        <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '4px' }}>
          {t('ocrHint', 'Take field receipt photo to automatically log inputs and fertilizers in local database.')}
        </p>
      </div>

      {/* Credit / Microfinance Tracker */}
      <div className="card">
        <span className="card-title">
          <i className="ti ti-coin"></i> {t('creditTracker', 'Credit & Microfinance Profile')}
        </span>
        <p className="card-subtitle">
          {t('creditTrackerDesc', 'Formal credit ledger tracking outstanding loans.')}
        </p>
        <button
          className="btn btn-secondary btn-sm"
          style={{ width: 'auto', alignSelf: 'flex-start', marginBottom: '8px' }}
          onClick={() => setActiveTab('finance')}
        >
          🏦 <span>{t('browseFinance', 'Browse loans & insurance')}</span>
        </button>

        <div id="credit-loans-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {loans.map(l => (
            <div key={l.id} className="stock-item" style={{ background: 'var(--background-slate)' }}>
              <div className="stock-info">
                <span style={{ fontSize: '24px' }}>🏛️</span>
                <div>
                  <div className="stock-name">{l.bank}</div>
                  <div className="stock-district">{l.type} · {l.rate}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>
                  LKR {l.outstanding.toLocaleString()}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  of LKR {l.principal.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Ledger Transactions */}
      <div className="card">
        <div className="card-title-row">
          <span className="card-title">
            <i className="ti ti-list"></i> {t('recentTransactions', 'Recent Transactions')}
          </span>
          <button className="btn btn-secondary btn-sm" onClick={() => openModal('modal-add-txn')}>
            <i className="ti ti-plus"></i> <span>{t('add', 'Add')}</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} id="ledger-txn-list">
          {cycleTxns.length === 0 ? (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '10px 0' }}>
              No transactions recorded for this cycle yet. Tap Add or Scan Receipt.
            </div>
          ) : (
            cycleTxns.map(t => (
              <div
                key={t.id}
                className="stock-item"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--card-surface)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>
                    {t.type === 'income' ? '💰' : t.category === 'land-prep' ? '🚜' : t.category === 'labor' ? '👷' : '🧪'}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-dark)' }}>{t.desc}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {t.date} · {t.category}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: '13px',
                      color: t.type === 'income' ? 'var(--primary-green)' : 'var(--destructive-red)'
                    }}
                  >
                    {t.type === 'income' ? '+' : '-'}LKR {t.amount.toLocaleString()}
                  </span>
                  <button
                    className="modal-close-btn"
                    style={{ color: 'var(--text-muted)', fontSize: '15px' }}
                    onClick={() => {
                      if (window.confirm(`Delete transaction "${t.desc}"?`)) {
                        deleteTransaction(t.id);
                      }
                    }}
                    title="Delete transaction"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
