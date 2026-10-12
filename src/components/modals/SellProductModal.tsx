import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SellProductModal: React.FC = () => {
  const { activeModal, closeModal, addListing, t, showToast } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('vegetables');
  const [qty, setQty] = useState('10');
  const [unit, setUnit] = useState('kg');
  const [price, setPrice] = useState('');
  const [district, setDistrict] = useState('Polonnaruwa');
  const [phone, setPhone] = useState('077 123 4567');
  const [photoData, setPhotoData] = useState<string | null>(null);

  if (activeModal !== 'modal-sell-crop') return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      showToast('Please enter a product name');
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      showToast('Please enter a valid price per unit');
      return;
    }
    const parsedQty = parseFloat(qty);
    if (isNaN(parsedQty) || parsedQty <= 0) {
      showToast('Quantity must be greater than 0');
      return;
    }

    // Determine category icon
    let icon = '🥬';
    if (category === 'fruits') icon = '🍎';
    else if (category === 'farm-items') icon = '🧺';
    else if (category === 'inputs') icon = '🛠️';

    await addListing({
      name: name.trim(),
      category,
      price: parsedPrice,
      unit,
      district,
      phone: phone.trim() || undefined,
      photo: photoData || undefined,
      icon,
      badge: 'Fresh Harvest',
      rating: '5.0'
    });

    // Reset form
    setName('');
    setPrice('');
    setQty('10');
    setPhotoData(null);
    closeModal();
  };

  return (
    <div className="modal-overlay active" id="modal-sell-crop" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet">
        <div className="modal-header">
          <span className="modal-title">{t('sellProduct', 'Sell your products')}</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div className="input-group">
          <label className="input-label">{t('sellName', 'Product name')}</label>
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="sell-name"
            maxLength={60}
            placeholder="e.g. Fresh Tomatoes"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">{t('sellCat', 'Category')}</label>
          <select
            className="input-field select-field"
            id="sell-cat"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="vegetables">🥬 Vegetables</option>
            <option value="fruits">🍎 Fruits</option>
            <option value="farm-items">🧺 Farm items (milk, eggs, grain, honey)</option>
            <option value="inputs">🛠️ Inputs & tools</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="input-group" style={{ flex: 1 }}>
            <label className="input-label">{t('sellQty', 'Quantity')}</label>
            <input
              type="number"
              min="1"
              className="input-field"
              style={{ paddingLeft: '14px' }}
              id="sell-qty"
              value={qty}
              onChange={e => setQty(e.target.value)}
            />
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label className="input-label">Unit</label>
            <select
              className="input-field select-field"
              id="sell-unit"
              value={unit}
              onChange={e => setUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="L">L</option>
              <option value="pcs">pcs</option>
              <option value="bag">bag</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">{t('sellPrice', 'Price per unit (LKR)')}</label>
          <input
            type="number"
            min="1"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="sell-price"
            placeholder="e.g. 95"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">{t('sellDistrict', 'District')}</label>
          <select
            className="input-field select-field"
            id="sell-district"
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

        <div className="input-group">
          <label className="input-label">{t('sellPhone', 'Contact number (optional)')}</label>
          <input
            type="tel"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="sell-phone"
            maxLength={15}
            placeholder="07X XXX XXXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">{t('sellPhoto', 'Product photo (optional)')}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="file"
              accept="image/*"
              id="sell-photo"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ width: 'auto' }}
              onClick={() => document.getElementById('sell-photo')?.click()}
            >
              📷 <span>{t('addPhoto', 'Add photo')}</span>
            </button>
            {photoData && (
              <span id="sell-photo-preview" style={{ fontSize: '11px', color: 'var(--primary-green)', fontWeight: 600 }}>
                Photo selected ✓
              </span>
            )}
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          {t('sellPublish', 'Publish listing')}
        </button>
      </div>
    </div>
  );
};
