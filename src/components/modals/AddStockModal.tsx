import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AddStockModal: React.FC = () => {
  const { activeModal, closeModal, addCropStock, showToast } = useApp();

  const [crop, setCrop] = useState('Paddy (Nadu)');
  const [district, setDistrict] = useState('Polonnaruwa');
  const [qty, setQty] = useState(1000);
  const [days, setDays] = useState(60);

  if (activeModal !== 'modal-add-stock') return null;

  const handleSubmit = async () => {
    if (qty <= 0) {
      showToast('Quantity must be greater than 0 kg');
      return;
    }
    if (days < 0) {
      showToast('Days to harvest cannot be negative');
      return;
    }
    await addCropStock(crop, district, qty, `${days}d to harvest`);
    closeModal();
  };

  return (
    <div className="modal-overlay active" id="modal-add-stock" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet">
        <div className="modal-header">
          <span className="modal-title">+ Add Crop Stock to Reserve</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div className="input-group">
          <label className="input-label">Crop Variety</label>
          <select
            className="input-field select-field"
            id="stock-crop-select"
            value={crop}
            onChange={e => setCrop(e.target.value)}
          >
            <option value="Paddy (Nadu)">Paddy (Nadu BG 366)</option>
            <option value="Paddy (Samba)">Paddy (Samba BG 358)</option>
            <option value="Tomato">Tomato (Keells Hybrid)</option>
            <option value="Chili">Chili (M2 Hybrid)</option>
            <option value="Brinjal">Brinjal (Padagoda)</option>
            <option value="Carrot">Carrot (New Kuroda)</option>
            <option value="Banana">Banana (Ambul)</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Aggregating District</label>
          <select
            className="input-field select-field"
            id="stock-district-select"
            value={district}
            onChange={e => setDistrict(e.target.value)}
          >
            <option value="Polonnaruwa">Polonnaruwa</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Ampara">Ampara</option>
            <option value="Matara">Matara</option>
            <option value="Badulla">Badulla</option>
            <option value="Kandy">Kandy</option>
            <option value="Jaffna">Jaffna</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Yield Estimate Quantity (kg)</label>
          <input
            type="number"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="stock-qty-input"
            value={qty}
            step="100"
            min="1"
            onChange={e => setQty(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Estimated Days to Harvest</label>
          <input
            type="number"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="stock-days-input"
            value={days}
            min="0"
            onChange={e => setDays(parseInt(e.target.value) || 0)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Log Harvest Stock
        </button>
      </div>
    </div>
  );
};
