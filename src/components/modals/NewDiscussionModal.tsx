import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DISC_CATS } from '../../data/discCats';

export const NewDiscussionModal: React.FC = () => {
  const { activeModal, closeModal, addDiscussion, t, showToast } = useApp();

  const [category, setCategory] = useState(DISC_CATS[0] || 'Crops');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (activeModal !== 'modal-new-disc') return null;

  const handleSubmit = async () => {
    if (!title.trim()) {
      showToast('Please enter a discussion title');
      return;
    }
    if (!content.trim()) {
      showToast('Please enter details or your question');
      return;
    }

    await addDiscussion(title.trim(), content.trim(), category);
    setTitle('');
    setContent('');
    closeModal();
  };

  return (
    <div className="modal-overlay active" id="modal-new-disc" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet">
        <div className="modal-header">
          <span className="modal-title">{t('newDiscussion', 'New discussion')}</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div className="input-group">
          <label className="input-label">Category</label>
          <select
            className="input-field select-field"
            id="disc-cat"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {DISC_CATS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">{t('discTitle', 'Title')}</label>
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '14px' }}
            id="disc-title"
            maxLength={120}
            placeholder="What's your question?"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">{t('discBody', 'Details')}</label>
          <textarea
            className="input-field textarea-field"
            id="disc-content"
            rows={4}
            maxLength={800}
            placeholder="Add details, variety, observed conditions..."
            value={content}
            onChange={e => setContent(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          {t('postBtn', 'Post')}
        </button>
      </div>
    </div>
  );
};
