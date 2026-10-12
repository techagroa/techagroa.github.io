import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { varieties } from '../../data/varieties';

export const AddCycleModal: React.FC = () => {
  const { activeModal, closeModal, addCycle, t } = useApp();

  const [season, setSeason] = useState('Yala Season 2026');
  const [category, setCategory] = useState<'paddy' | 'vegetables' | 'fruits' | 'livestock'>('paddy');
  const [variety, setVariety] = useState(varieties.paddy[0].value);
  const [acres, setAcres] = useState(2);

  if (activeModal !== 'modal-add-cycle') return null;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value as 'paddy' | 'vegetables' | 'fruits' | 'livestock';
    setCategory(newCat);
    const list = varieties[newCat] || varieties.paddy;
    setVariety(list[0].value);
  };

  const handleSubmit = async () => {
    if (acres <= 0) return;
    await addCycle(season, category, variety, acres);
    closeModal();
  };

  const varietyOptions = varieties[category] || varieties.paddy;

  return (
    <div className="modal-overlay active" id="modal-add-cycle" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet">
        <div className="modal-header">
          <span className="modal-title">+ Start New Cultivation Cycle</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div className="input-group">
          <label className="input-label">Cultivation Season</label>
          <select
            className="input-field select-field"
            id="new-cycle-season"
            value={season}
            onChange={e => setSeason(e.target.value)}
          >
            <option value="Maha Season 2026/27">Maha Season 2026/27 (Sep-Feb)</option>
            <option value="Yala Season 2026">Yala Season 2026 (Apr-Aug)</option>
            <option value="Year Round">Year Round Cultivation</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Cultivation Category</label>
          <select
            className="input-field select-field"
            id="new-cycle-category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="paddy">Paddy / වී</option>
            <option value="vegetables">Vegetables / එළවළු</option>
            <option value="fruits">Fruits / පලතුරු</option>
            <option value="livestock">Livestock & Farm Items / සත්ව ගොවිපල</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Target Crop / Product Variety</label>
          <select
            className="input-field select-field"
            id="new-cycle-crop"
            value={variety}
            onChange={e => setVariety(e.target.value)}
          >
            {varietyOptions.map(v => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Farmed Acreage (Acres) / Heads</label>
          <input
            type="number"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="new-cycle-acres"
            value={acres}
            step="0.5"
            min="0.1"
            onChange={e => setAcres(parseFloat(e.target.value) || 0)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Initialize Cycle
        </button>
      </div>
    </div>
  );
};
