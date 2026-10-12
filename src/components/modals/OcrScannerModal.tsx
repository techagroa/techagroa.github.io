import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { processReceiptImage } from '../../services/ocr';

export const OcrScannerModal: React.FC = () => {
  const { activeModal, closeModal, addTransaction, showToast } = useApp();

  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    merchant: string;
    description: string;
    amount: number;
    date: string;
    category: 'land-prep' | 'inputs' | 'labor' | 'harvest';
  } | null>(null);

  if (activeModal !== 'modal-ocr-scanner') return null;

  const handleScanSample = async (type: 'fertilizer' | 'seeds' | 'tractor') => {
    setIsScanning(true);
    setExtractedData(null);
    await new Promise(r => setTimeout(r, 1200));

    const today = new Date().toISOString().split('T')[0];
    if (type === 'fertilizer') {
      setExtractedData({
        merchant: 'Gov Fertilizer Depot - Polonnaruwa',
        description: 'Subsidized Urea 50kg Voucher Slip',
        amount: 3200,
        date: today,
        category: 'inputs'
      });
    } else if (type === 'seeds') {
      setExtractedData({
        merchant: 'Keells Farm Seeds Center',
        description: 'Certified Tomato & Chili Seed Packets',
        amount: 8500,
        date: today,
        category: 'inputs'
      });
    } else {
      setExtractedData({
        merchant: 'Ranjith Land Master Hire Services',
        description: 'Tractor 2-day Mud Tilling Land Prep',
        amount: 9200,
        date: today,
        category: 'land-prep'
      });
    }
    setIsScanning(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsScanning(true);
    setExtractedData(null);

    try {
      const res = await processReceiptImage(file);
      setExtractedData({
        merchant: res.merchant,
        description: res.description,
        amount: res.amount,
        date: res.date,
        category: res.category
      });
    } catch (err) {
      showToast('OCR extraction failed. You can enter details manually.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleConfirmTransaction = async () => {
    if (!extractedData) return;
    if (extractedData.amount <= 0 || !extractedData.description.trim()) {
      showToast('Please review the extracted values before saving.');
      return;
    }

    await addTransaction(
      `${extractedData.merchant} - ${extractedData.description}`,
      extractedData.amount,
      'expense',
      extractedData.category,
      extractedData.date,
      extractedData.merchant
    );

    setExtractedData(null);
    closeModal();
  };

  return (
    <div className="modal-overlay active" id="modal-ocr-scanner" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet" style={{ maxHeight: '90%' }}>
        <div className="modal-header">
          <span className="modal-title">Receipt OCR Scanner</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <p className="card-subtitle">
          Upload receipt image or select a certified agro-slip. Values require your review before saving.
        </p>

        {/* Upload Button */}
        <div style={{ marginBottom: '12px' }}>
          <label className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
            <i className="ti ti-camera"></i> Upload / Snap Receipt
            <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleFileUpload} />
          </label>
        </div>

        {/* Quick Sample Slips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          <button className="btn btn-secondary" onClick={() => handleScanSample('fertilizer')} disabled={isScanning}>
            🎟️ Scan Sample: Gov Fertilizer Depot Slip (LKR 3,200)
          </button>
          <button className="btn btn-secondary" onClick={() => handleScanSample('seeds')} disabled={isScanning}>
            🎟️ Scan Sample: Keells Seed Purchase Slip (LKR 8,500)
          </button>
          <button className="btn btn-secondary" onClick={() => handleScanSample('tractor')} disabled={isScanning}>
            🎟️ Scan Sample: Land Master Tractor Rental Bill (LKR 9,200)
          </button>
        </div>

        {/* Scanning Animation */}
        {isScanning && (
          <div id="ocr-scanning-animation" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px', gap: '10px' }}>
            <i className="ti ti-loader animate-spin" style={{ fontSize: '32px', color: 'var(--primary-green)' }}></i>
            <span style={{ fontSize: '12px', fontWeight: 700 }}>Extracting Receipt Metadata & Confidence Scores...</span>
          </div>
        )}

        {/* Extracted Editable Form */}
        {extractedData && (
          <div style={{ background: 'var(--background-slate)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="ti ti-circle-check"></i> Parsed Details (Review & Confirm)
            </div>

            <div className="input-group">
              <label className="input-label">Vendor / Merchant</label>
              <input
                type="text"
                className="input-field"
                value={extractedData.merchant}
                onChange={e => setExtractedData({ ...extractedData, merchant: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Description</label>
              <input
                type="text"
                className="input-field"
                value={extractedData.description}
                onChange={e => setExtractedData({ ...extractedData, description: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Amount (LKR)</label>
                <input
                  type="number"
                  className="input-field"
                  value={extractedData.amount}
                  onChange={e => setExtractedData({ ...extractedData, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={extractedData.date}
                  onChange={e => setExtractedData({ ...extractedData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Category</label>
              <select
                className="input-field select-field"
                value={extractedData.category}
                onChange={e => setExtractedData({ ...extractedData, category: e.target.value as any })}
              >
                <option value="inputs">Inputs (Seeds, Fertilizer, Agro-chemicals)</option>
                <option value="land-prep">Land Prep (Tractor Hire, Tilling, Fuel)</option>
                <option value="labor">Labor Wages (Daily workers)</option>
                <option value="harvest">Harvesting (Harvester leasing, Transport)</option>
              </select>
            </div>

            <button className="btn btn-primary" onClick={handleConfirmTransaction} style={{ marginTop: '6px' }}>
              Confirm & Save to Ledger
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
