import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const BookEquipmentModal: React.FC = () => {
  const { activeModal, closeModal, selectedEquipment, bookEquipment, showToast } = useApp();

  const [date, setDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split('T')[0];
  });
  const [duration, setDuration] = useState(2);

  if (activeModal !== 'modal-book-equip' || !selectedEquipment) return null;

  const rate = selectedEquipment.rent || 5000;
  const estimatedTotal = rate * duration;

  const handleSubmit = async () => {
    if (duration <= 0) {
      showToast('Duration must be at least 1 day');
      return;
    }
    await bookEquipment(
      selectedEquipment.name,
      selectedEquipment.supplier,
      date,
      duration,
      'days',
      estimatedTotal
    );
    closeModal();
  };

  return (
    <div className="modal-overlay active" id="modal-book-equip" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet">
        <div className="modal-header">
          <span className="modal-title">Book Agriculture Machinery</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>{selectedEquipment.icon || '🚜'}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>{selectedEquipment.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Supplier: {selectedEquipment.supplier} · {selectedEquipment.location}
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Booking Date</label>
          <input
            type="date"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="booking-date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Duration Days / Acre size</label>
          <input
            type="number"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="booking-duration"
            value={duration}
            min="1"
            onChange={e => setDuration(parseInt(e.target.value) || 1)}
          />
        </div>

        <div style={{ background: 'var(--primary-green-light)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', color: 'var(--primary-dark)', fontWeight: 600 }}>Estimated Cost Breakdown:</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-green)' }}>
            LKR {estimatedTotal.toLocaleString()}{' '}
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)' }}>
              ({duration} days @ LKR {rate.toLocaleString()}/day)
            </span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Offline request queued. Supplier payment confirmed directly upon field arrival.
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Confirm Offline Booking
        </button>
      </div>
    </div>
  );
};
