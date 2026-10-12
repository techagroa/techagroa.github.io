import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ProfileModal: React.FC = () => {
  const { activeModal, closeModal, user, updateUser, resetToDemoData, showToast } = useApp();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [district, setDistrict] = useState(user.district);
  const [mode, setMode] = useState(user.mode);

  if (activeModal !== 'modal-profile') return null;

  const handleSave = () => {
    updateUser({
      name: name.trim() || 'Farmer',
      phone: phone.trim() || '077 123 4567',
      district,
      mode
    });
    showToast('Profile updated successfully');
    closeModal();
  };

  return (
    <div className="modal-overlay active" id="modal-profile" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet">
        <div className="modal-header">
          <span className="modal-title">Farmer Profile & Configuration</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div style={{ background: 'var(--background-slate)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
          Mode indicator: <strong>{mode === 'demo' ? 'Local Demo Mode (Offline / Simulated Records)' : 'Connected Mode (Firebase Backend)'}</strong>
        </div>

        <div className="input-group">
          <label className="input-label">Operating Mode</label>
          <select
            className="input-field select-field"
            value={mode}
            onChange={e => setMode(e.target.value as 'demo' | 'connected')}
          >
            <option value="demo">Local Demo Mode (No credentials required)</option>
            <option value="connected">Connected Mode (Firebase / Cloud Sync)</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Full Name</label>
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Contact Phone</label>
          <input
            type="tel"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Agrarian District</label>
          <select
            className="input-field select-field"
            value={district}
            onChange={e => setDistrict(e.target.value)}
          >
            <option value="Polonnaruwa">Polonnaruwa</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Ampara">Ampara</option>
            <option value="Matara">Matara</option>
            <option value="Kandy">Kandy</option>
            <option value="Colombo">Colombo</option>
            <option value="Jaffna">Jaffna</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>
            Save Profile
          </button>
          <button
            className="btn btn-secondary"
            style={{ width: 'auto', color: 'var(--destructive-red)' }}
            onClick={async () => {
              if (window.confirm('Reset all demo data back to clean factory state?')) {
                await resetToDemoData();
                closeModal();
              }
            }}
          >
            Reset Demo
          </button>
        </div>
      </div>
    </div>
  );
};
