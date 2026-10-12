import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getDistrictWeather } from '../../services/weather';

export const HomeScreen: React.FC = () => {
  const {
    t,
    setActiveTab,
    openModal,
    cropStocks,
    deleteCropStock,
    user
  } = useApp();

  const weather = getDistrictWeather(user.district);

  // Map tooltip state
  const [tooltipData, setTooltipData] = useState<{
    district: string;
    province: string;
    paddy: string;
    veg: string;
  } | null>({
    district: 'Polonnaruwa',
    province: 'North Central',
    paddy: '2,500 MT',
    veg: '800 MT'
  });

  // Calculate dynamic aggregated district stocks combining base seed + user additions
  const getAggregatedDistrictStock = (districtName: string) => {
    // Base fixtures in MT
    const baseStocks: Record<string, { paddyMT: number; vegMT: number; province: string }> = {
      Polonnaruwa: { paddyMT: 2500, vegMT: 800, province: 'North Central' },
      Anuradhapura: { paddyMT: 5200, vegMT: 1500, province: 'North Central' },
      Kurunegala: { paddyMT: 4800, vegMT: 2400, province: 'North Western' },
      Ampara: { paddyMT: 6100, vegMT: 400, province: 'Eastern' },
      Matara: { paddyMT: 1200, vegMT: 750, province: 'Southern' }
    };

    const base = baseStocks[districtName] || { paddyMT: 1000, vegMT: 500, province: 'General' };

    // Add user additions in MT (kg / 1000)
    let addedPaddyMT = 0;
    let addedVegMT = 0;

    cropStocks
      .filter(s => s.district.toLowerCase() === districtName.toLowerCase())
      .forEach(s => {
        const mt = s.qty / 1000;
        if (s.crop.toLowerCase().includes('paddy')) {
          addedPaddyMT += mt;
        } else {
          addedVegMT += mt;
        }
      });

    return {
      district: districtName,
      province: base.province,
      paddy: `${(base.paddyMT + addedPaddyMT).toLocaleString(undefined, { maximumFractionDigits: 1 })} MT`,
      veg: `${(base.vegMT + addedVegMT).toLocaleString(undefined, { maximumFractionDigits: 1 })} MT`
    };
  };

  const handleDistrictClick = (districtName: string) => {
    setTooltipData(getAggregatedDistrictStock(districtName));
  };

  return (
    <div className="screen active" id="screen-home">
      {/* Weather Hero Card */}
      <div
        className="weather-card"
        onClick={() => setActiveTab('weather-advisory')}
        style={{ cursor: 'pointer' }}
        title="Tap for 5-day Weather & Maha/Yala Advisory"
      >
        <div className="weather-header">
          <div className="weather-loc-season">
            <span className="weather-loc">
              <i className="ti ti-map-pin"></i> {weather.district}
            </span>
            <span className="weather-season">
              {weather.season}
            </span>
          </div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
            {weather.province}
          </span>
        </div>

        <div className="weather-current">
          <div className="weather-temp-block">
            <span className="weather-temp" id="wx-temp">{weather.temp}°C</span>
            <i className={`ti ${weather.icon} weather-icon-big`} id="wx-icon"></i>
          </div>
          <div className="weather-desc-block">
            <span className="weather-condition" id="wx-desc">
              {weather.condition}
            </span>
            <span style={{ fontSize: '10px', opacity: 0.8 }}>
              {weather.updatedTime}
            </span>
          </div>
        </div>

        <div style={{ fontSize: '11px', background: 'rgba(255,255,255,0.14)', padding: '8px 10px', borderRadius: '8px', marginTop: '10px', lineHeight: 1.45 }}>
          <strong><i className="ti ti-bulb"></i> {t('advisoryTag', 'Advisory:')}</strong>{' '}
          <span id="home-advisory-text">{weather.advisory}</span>
        </div>

        <div className="weather-details">
          <div className="weather-detail-item">
            <i className="ti ti-droplet"></i>
            <span id="wx-hum">{weather.humidity}% {t('humidity', 'Humidity')}</span>
          </div>
          <div className="weather-detail-item">
            <i className="ti ti-wind"></i>
            <span id="wx-wind">{weather.wind} km/h {t('wind', 'Wind')}</span>
          </div>
        </div>
      </div>

      {/* Urgent Pest Warning Banner */}
      <div className="alert-banner">
        <i className="ti ti-alert-triangle-filled"></i>
        <div className="alert-content">
          <strong><span>{t('pestAlertTitle', 'Pest Outbreak Alert:')}</span></strong>{' '}
          <span>{t('pestAlertDesc', 'Paddy Blast warning in Anuradhapura & Polonnaruwa fields. Inspect daily.')}</span>
        </div>
      </div>

      {/* 8 Quick Action Shortcuts */}
      <div className="input-group">
        <span className="input-label">{t('quickAccess', 'Quick Access')}</span>
        <div className="quick-actions-grid">
          <div className="quick-action-btn qa-products" onClick={() => setActiveTab('products')}>
            <i className="ti ti-package"></i>
            <span>{t('navProducts', 'My Products')}</span>
          </div>
          <div className="quick-action-btn qa-market" onClick={() => setActiveTab('market')}>
            <i className="ti ti-building-store"></i>
            <span>{t('navMarket', 'Market')}</span>
          </div>
          <div className="quick-action-btn qa-ledger" onClick={() => setActiveTab('ledger')}>
            <i className="ti ti-report-money"></i>
            <span>{t('navLedger', 'Ledger')}</span>
          </div>
          <div className="quick-action-btn qa-expert" onClick={() => setActiveTab('expert')}>
            <i className="ti ti-headset"></i>
            <span>{t('aiExpert', 'AI Expert')}</span>
          </div>
          <div className="quick-action-btn qa-equip" onClick={() => setActiveTab('equipment')}>
            <i className="ti ti-tractor"></i>
            <span>{t('equipCentre', 'Equipment')}</span>
          </div>
          <div className="quick-action-btn qa-schemes" onClick={() => setActiveTab('schemes')}>
            <i className="ti ti-building-bank"></i>
            <span>{t('govSchemes', 'Schemes')}</span>
          </div>
          <div className="quick-action-btn qa-weather" onClick={() => setActiveTab('weather-advisory')}>
            <i className="ti ti-cloud-sun"></i>
            <span>{t('weather', 'Weather')}</span>
          </div>
          <div className="quick-action-btn qa-grievance" onClick={() => setActiveTab('grievance')}>
            <i className="ti ti-mail-exclamation"></i>
            <span>{t('grievance', 'Grievance')}</span>
          </div>
        </div>
      </div>

      {/* Interactive National Crop Stock Map */}
      <div className="card">
        <div className="card-title-row">
          <span className="card-title">
            <i className="ti ti-map-2"></i> {t('cropMapTitle', 'National Crop Stock Map')}
          </span>
          <span className="badge badge-green">{t('liveUpdates', 'Live Aggregation')}</span>
        </div>
        <p className="card-subtitle">
          {t('cropMapDesc', 'Aggregated harvest yield estimates by district to stop price manipulation.')}
        </p>

        <div className="map-container">
          <svg className="map-svg" viewBox="0 0 200 350">
            {/* Outline of Sri Lanka */}
            <path
              d="M 95 30 Q 110 50 120 70 T 135 120 T 150 170 T 160 220 T 145 270 T 120 310 Q 105 320 95 315 T 70 260 T 60 210 T 65 150 T 75 90 Z"
              fill="#b8e2cd"
              stroke="#1B8A3E"
              strokeWidth="1.5"
            />

            {/* Clickable District Nodes */}
            <g className="district-node" onClick={() => handleDistrictClick('Polonnaruwa')}>
              <circle cx="120" cy="140" r="10" fill="#1B8A3E" />
              <text x="133" y="143">Polonnaruwa</text>
            </g>
            <g className="district-node" onClick={() => handleDistrictClick('Anuradhapura')}>
              <circle cx="100" cy="100" r="12" fill="#1B8A3E" />
              <text x="50" y="95">Anuradhapura</text>
            </g>
            <g className="district-node" onClick={() => handleDistrictClick('Kurunegala')}>
              <circle cx="85" cy="170" r="11" fill="#1B8A3E" />
              <text x="30" y="173">Kurunegala</text>
            </g>
            <g className="district-node" onClick={() => handleDistrictClick('Ampara')}>
              <circle cx="145" cy="180" r="12" fill="#52B788" />
              <text x="157" y="183">Ampara</text>
            </g>
            <g className="district-node" onClick={() => handleDistrictClick('Matara')}>
              <circle cx="110" cy="290" r="8" fill="#F4A261" />
              <text x="122" y="293">Matara</text>
            </g>
          </svg>

          <div className="map-legend">
            <div className="legend-item"><span className="legend-dot" style={{ background: '#1B8A3E' }}></span><span>Surplus</span></div>
            <div className="legend-item"><span className="legend-dot" style={{ background: '#52B788' }}></span><span>Stable</span></div>
            <div className="legend-item"><span className="legend-dot" style={{ background: '#F4A261' }}></span><span>Low</span></div>
          </div>

          {tooltipData && (
            <div className="map-tooltip" id="map-tooltip-box" style={{ display: 'block' }}>
              <strong id="tooltip-district">{tooltipData.district}</strong> ({tooltipData.province})<br />
              <span>{t('paddyStock', 'Paddy Stock:')}</span> <span>{tooltipData.paddy}</span><br />
              <span>{t('vegStock', 'Veg Stock:')}</span> <span>{tooltipData.veg}</span>
            </div>
          )}
        </div>
      </div>

      {/* My Crop Stock Section */}
      <div className="card">
        <div className="card-title-row">
          <span className="card-title">
            <i className="ti ti-archive"></i> {t('myCropStock', 'My Crop Stock')}
          </span>
          <button className="btn btn-primary btn-sm" onClick={() => openModal('modal-add-stock')}>
            <i className="ti ti-plus"></i> <span>{t('addStock', 'Add')}</span>
          </button>
        </div>

        <div id="crop-stock-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {cropStocks.length === 0 ? (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
              No crops logged yet. Tap Add to record expected harvest.
            </div>
          ) : (
            cropStocks.map(s => (
              <div key={s.id} className="stock-item">
                <div className="stock-info">
                  <span style={{ fontSize: '24px' }}>
                    {s.crop.toLowerCase().includes('paddy') ? '🌾' : s.crop.toLowerCase().includes('tomato') ? '🍅' : '🌱'}
                  </span>
                  <div>
                    <div className="stock-name">{s.crop}</div>
                    <div className="stock-district">{s.district} · {s.days}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="stock-qty">{s.qty.toLocaleString()} kg</div>
                  <button
                    className="modal-close-btn"
                    style={{ fontSize: '16px', color: 'var(--text-muted)' }}
                    onClick={() => deleteCropStock(s.id)}
                    title="Remove stock"
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
