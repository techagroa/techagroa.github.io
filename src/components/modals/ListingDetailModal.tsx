import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ListingDetailModal: React.FC = () => {
  const { activeModal, closeModal, selectedListing, showToast } = useApp();

  const [inquiryQty, setInquiryQty] = useState('50');

  if (activeModal !== 'modal-listing' || !selectedListing) return null;

  const handleSendPurchaseRequest = () => {
    const qtyNum = parseFloat(inquiryQty);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      showToast('Please enter a valid quantity');
      return;
    }
    showToast(`Purchase request for ${qtyNum} ${selectedListing.unit || 'units'} sent to ${selectedListing.vendor}!`);
    closeModal();
  };

  const phoneLink = selectedListing.phone ? `tel:${selectedListing.phone.replace(/\s+/g, '')}` : null;

  return (
    <div className="modal-overlay active" id="modal-listing" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet">
        <div className="modal-header">
          <span className="modal-title" id="listing-title">{selectedListing.name}</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div id="listing-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Photo or Icon Fallback */}
          <div
            style={{
              height: '140px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--background-slate)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid var(--border-color)'
            }}
          >
            {selectedListing.photo ? (
              <img
                src={selectedListing.photo}
                alt={selectedListing.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '56px' }}>{selectedListing.icon || '📦'}</span>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-green)' }}>
                LKR {selectedListing.price.toLocaleString()}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {' '}/ {selectedListing.unit || 'unit'}
              </span>
            </div>
            {selectedListing.badge && (
              <span className="pill pill-green">{selectedListing.badge}</span>
            )}
          </div>

          <div style={{ background: 'var(--background-slate)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div><strong>Vendor:</strong> {selectedListing.vendor}</div>
            <div><strong>Location:</strong> {selectedListing.district || 'Polonnaruwa'}</div>
            {selectedListing.limit && <div><strong>Terms:</strong> {selectedListing.limit}</div>}
          </div>

          {/* Contact Seller */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {phoneLink ? (
              <a
                href={phoneLink}
                className="btn btn-secondary"
                style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <i className="ti ti-phone"></i> Call {selectedListing.phone}
              </a>
            ) : (
              <button
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => showToast('Vendor contact phone is unlisted. Inquiry routed via direct app message.')}
              >
                <i className="ti ti-mail"></i> Inquire Direct
              </button>
            )}
          </div>

          {/* Purchase Request Flow */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Send Purchase / Wholesale Request
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="number"
                className="input-field"
                style={{ flex: 1, paddingLeft: '12px' }}
                placeholder={`Quantity (${selectedListing.unit || 'units'})`}
                value={inquiryQty}
                onChange={e => setInquiryQty(e.target.value)}
              />
              <button className="btn btn-primary" style={{ width: 'auto' }} onClick={handleSendPurchaseRequest}>
                Send Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
