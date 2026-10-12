import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const GrievanceScreen: React.FC = () => {
  const { setActiveTab, grievances, addGrievance, showToast, t } = useApp();

  const [center, setCenter] = useState('Polonnaruwa Agrarian Service Center');
  const [category, setCategory] = useState('Fertilizer Shortage');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [locStatus, setLocStatus] = useState<string>('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocStatus('Geolocation is not supported by your device browser.');
      return;
    }
    setLocStatus('Acquiring GPS coordinates...');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocStatus(`GPS Acquired: ${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E`);
      },
      err => {
        // Fallback default coordinates for Polonnaruwa
        setLocation({ lat: 7.9403, lng: 81.0188 });
        setLocStatus('Default regional center coordinates tagged (7.9403°N, 81.0188°E)');
      },
      { timeout: 8000 }
    );
  };

  const handleSubmit = async () => {
    if (!desc.trim()) {
      showToast('Please provide grievance description details');
      return;
    }
    await addGrievance(center, category, desc.trim(), photo, location);
    setDesc('');
    setPhoto(undefined);
    setLocation(undefined);
    setLocStatus('');
  };

  return (
    <div className="screen active" id="screen-grievance">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
        <span className="bold" style={{ fontSize: '15px' }}>{t('grievance', 'Grievance Hub')}</span>
      </div>

      <div className="card">
        <span className="card-title">
          <i className="ti ti-file-certificate"></i> {t('reportGrievance', 'Report Agrarian Shortfall')}
        </span>
        <p className="card-subtitle">
          {t('grievanceFormDesc', 'Direct reporting of center shortfalls, disasters or wild elephant crop damages with GPS metadata.')}
        </p>

        <div className="input-group">
          <label className="input-label">{t('selectAgrarian', 'Agrarian Development Center')}</label>
          <div className="input-wrapper">
            <i className="ti ti-building-community"></i>
            <select
              className="input-field select-field"
              id="grievance-center"
              value={center}
              onChange={e => setCenter(e.target.value)}
            >
              <option value="Department of Agriculture">Department of Agriculture</option>
              <option value="Agrarian Services Department">Agrarian Services Department</option>
              <option value="Divisional Secretariat">Divisional Secretariat</option>
              <option value="Provincial Agriculture Ministry">Provincial Agriculture Ministry</option>
              <option value="Polonnaruwa Agrarian Service Center">Polonnaruwa Agrarian Service Center</option>
              <option value="Other">Other Regional Depot</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">{t('issueType', 'Issue Category')}</label>
          <div className="input-wrapper">
            <i className="ti ti-exclamation-mark"></i>
            <select
              className="input-field select-field"
              id="grievance-category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="Crop Damage">Crop Damage</option>
              <option value="Pest Infestation">Pest Infestation</option>
              <option value="Irrigation Issue">Irrigation Issue</option>
              <option value="Fertilizer/Input Quality">Fertilizer/Input Quality</option>
              <option value="Fertilizer Shortage">Fertilizer Shortage</option>
              <option value="Subsidy Issue">Subsidy Issue</option>
              <option value="Land Dispute">Land Dispute</option>
              <option value="Wildlife Damage">Wildlife Damage</option>
              <option value="Flood Damage">Flood Damage</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">{t('description', 'Description Details')}</label>
          <textarea
            className="input-field textarea-field"
            id="grievance-desc"
            rows={3}
            placeholder="Describe the situation here..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>

        <div className="input-group">
          <label className="input-label">{t('attachPhotoOpt', 'Attach photo (optional)')}</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="file"
              accept="image/*"
              id="g-photo"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ width: 'auto' }}
              onClick={() => document.getElementById('g-photo')?.click()}
            >
              📷 <span>{t('addPhoto', 'Add photo')}</span>
            </button>
            {photo && (
              <span id="field-photo-preview" style={{ fontSize: '11px', color: 'var(--primary-green)', fontWeight: 600 }}>
                Photo attached ✓
              </span>
            )}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">{t('locationOpt', 'Location (optional)')}</label>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ width: 'auto', alignSelf: 'flex-start' }}
            onClick={handleGetLocation}
          >
            📍 <span>{t('getLocation', 'Get my location')}</span>
          </button>
          {locStatus && (
            <div id="g-loc-status" style={{ fontSize: '11px', color: 'var(--primary-green)', marginTop: '6px', fontWeight: 600 }}>
              {locStatus}
            </div>
          )}
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          <i className="ti ti-mail-forward"></i> <span>{t('submitGrievance', 'Submit Official Grievance')}</span>
        </button>
      </div>

      {/* Grievance Submission History */}
      <div className="card">
        <span className="card-title">
          <i className="ti ti-history"></i> {t('grievanceHistory', 'Grievance Submission History')}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} id="grievance-history-list">
          {grievances.map(g => (
            <div
              key={g.id}
              style={{
                background: 'var(--background-slate)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-dark)' }}>
                  {g.category}
                </span>
                <span className={`pill ${g.status === 'In Progress' ? 'pill-orange' : 'pill-green'}`} style={{ fontSize: '10px' }}>
                  {g.status}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--primary-dark)', fontWeight: 600 }}>
                {g.center}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-dark)', lineHeight: 1.4, margin: '4px 0' }}>
                {g.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                <span>Ref: #{g.id.slice(-6).toUpperCase()}</span>
                <span>{g.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
