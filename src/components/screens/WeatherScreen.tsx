import React from 'react';
import { useApp } from '../../context/AppContext';
import { getDistrictWeather } from '../../services/weather';
import { cultivationCalendar } from '../../data/cultivationCalendar';

export const WeatherScreen: React.FC = () => {
  const { setActiveTab, user, language, t } = useApp();

  const weather = getDistrictWeather(user.district);

  return (
    <div className="screen active" id="screen-weather-advisory">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
        <span className="bold" style={{ fontSize: '15px' }}>{t('weather', 'Weather & Advisory')}</span>
      </div>

      {/* Spatial Weather Info & 5-Day Forecast Grid */}
      <div className="card">
        <div className="card-title-row">
          <span className="card-title">
            <i className="ti ti-cloud-sun"></i> 5-Day Forecast ({weather.district})
          </span>
          <span className="pill pill-green" style={{ fontSize: '10px' }}>{weather.season}</span>
        </div>
        <p className="card-subtitle">{weather.updatedTime}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginTop: '6px' }}>
          {weather.forecast.map((f, fIdx) => (
            <div
              key={fIdx}
              className="stock-item"
              style={{
                flexDirection: 'column',
                padding: '8px 4px',
                textAlign: 'center',
                gap: '4px',
                background: fIdx === 0 ? 'var(--primary-green-light)' : 'var(--background-slate)'
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 700 }}>{f.day}</span>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{f.date}</span>
              <i className={`ti ${f.icon}`} style={{ color: 'var(--primary-green)', fontSize: '20px' }}></i>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>{f.temp}</span>
              <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{f.condition}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Agro-Advisory */}
      <div className="card" style={{ borderLeft: '4px solid var(--secondary-accent)' }}>
        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--primary-dark)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="ti ti-bulb"></i> Department of Agriculture Field Advisory
        </div>
        <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-dark)' }}>
          {weather.advisory}
        </p>
      </div>

      {/* Maha & Yala Cultivation Calendar Matrix */}
      <div className="card">
        <span className="card-title">
          <i className="ti ti-calendar-stats"></i> Maha & Yala Cultivation Matrix
        </span>
        <p className="card-subtitle">
          Official planting seasons and crop guidelines based on Sri Lanka's agro-ecological zones.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} id="weather-matrix-container">
          {cultivationCalendar.map((item, idx) => {
            const cropName = (item.crop as any)[language] || item.crop.en;
            const months = (item.months as any)[language] || item.months.en;
            const zone = (item.zone as any)[language] || item.zone.en;

            return (
              <div
                key={idx}
                className="stock-item"
                style={{ background: 'var(--background-slate)', padding: '10px 12px' }}
              >
                <div className="stock-info">
                  <span style={{ fontSize: '22px' }}>
                    {idx === 0 ? '🌾' : idx === 1 ? '🌽' : '🍅'}
                  </span>
                  <div>
                    <div className="stock-name" style={{ fontSize: '13px' }}>{cropName}</div>
                    <div className="stock-district">
                      🗓️ {months} · 📍 {zone}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
