import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AddTransactionModal: React.FC = () => {
  const { activeModal, closeModal, addTransaction, showToast } = useApp();

  const [type, setType] = useState<'income' | 'expense'>('income');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('income');

  if (activeModal !== 'modal-add-txn') return null;

  const handleTypeChange = (newType: 'income' | 'expense') => {
    setType(newType);
    if (newType === 'income') setCategory('income');
    else setCategory('inputs');
  };

  const handleSubmit = async () => {
    const parsedAmount = parseFloat(amount);
    if (!desc.trim()) {
      showToast('Please enter description details');
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast('Please enter a valid amount');
      return;
    }

    await addTransaction(desc.trim(), parsedAmount, type, category);
    setDesc('');
    setAmount('');
    closeModal();
  };

  return (
    <div className="modal-overlay active" id="modal-add-txn" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet">
        <div className="modal-header">
          <span className="modal-title">+ Log Financial Transaction</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div className="role-switcher-container" style={{ marginBottom: '8px' }}>
          <button
            className={`role-tab ${type === 'income' ? 'active' : ''}`}
            id="txn-type-inc"
            onClick={() => handleTypeChange('income')}
          >
            Income / ධාන්‍ය විකුණුම්
          </button>
          <button
            className={`role-tab ${type === 'expense' ? 'active' : ''}`}
            id="txn-type-exp"
            onClick={() => handleTypeChange('expense')}
          >
            Expense / වියදම්
          </button>
        </div>

        <div className="input-group">
          <label className="input-label">Description details</label>
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="txn-desc"
            placeholder="e.g., Sold 250kg Nadu Paddy"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Amount (LKR)</label>
          <input
            type="number"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="txn-amount"
            placeholder="Amount in Rs."
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">{type === 'income' ? 'Income Category' : 'Expense Category'}</label>
          {type === 'income' ? (
            <select
              className="input-field select-field"
              id="txn-category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="income">Income (Sale of Yield)</option>
              <option value="subsidy">Government Subsidy Disbursal</option>
              <option value="other-income">Other Farm Receipts</option>
            </select>
          ) : (
            <select
              className="input-field select-field"
              id="txn-category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="inputs">Inputs (Seeds, Fertilizer, Agro-chemicals)</option>
              <option value="land-prep">Land Prep (Tractor Hire, Tilling, Fuel)</option>
              <option value="labor">Labor Wages (Daily workers)</option>
              <option value="harvest">Harvesting (Harvester leasing, Transport)</option>
            </select>
          )}
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Log Transaction
        </button>
      </div>
    </div>
  );
};
