import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DiscussionDetailModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    selectedDiscussion,
    addDiscussionReply,
    deleteDiscussion,
    user,
    showToast
  } = useApp();

  const [replyText, setReplyText] = useState('');

  if (activeModal !== 'modal-discussion' || !selectedDiscussion) return null;

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      showToast('Please type a reply');
      return;
    }
    await addDiscussionReply(selectedDiscussion.id, replyText.trim());
    setReplyText('');
  };

  const isAuthor = selectedDiscussion.author === user.name;

  return (
    <div className="modal-overlay active" id="modal-discussion" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet" style={{ height: '85%', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header">
          <span className="modal-title">💬 {selectedDiscussion.category}</span>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div id="disc-detail-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontWeight: 800, fontSize: '16px', lineHeight: 1.3 }}>
            {selectedDiscussion.title}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Posted by <strong>{selectedDiscussion.author}</strong> · {new Date(selectedDiscussion.ts).toLocaleDateString()}
          </div>
          <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-dark)' }}>
            {selectedDiscussion.content}
          </div>

          {isAuthor && (
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: 'auto', alignSelf: 'flex-start', color: 'var(--destructive-red)' }}
              onClick={async () => {
                if (window.confirm('Delete this discussion?')) {
                  await deleteDiscussion(selectedDiscussion.id);
                  closeModal();
                }
              }}
            >
              <i className="ti ti-trash"></i> Delete Post
            </button>
          )}

          {/* Replies Section */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
              Replies ({selectedDiscussion.replies.length})
            </div>

            {selectedDiscussion.replies.length === 0 ? (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No replies yet. Be the first to advise this farmer!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedDiscussion.replies.map(r => (
                  <div
                    key={r.id}
                    style={{
                      background: 'var(--background-slate)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <strong>{r.author}</strong>
                      <span>{new Date(r.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '4px', color: 'var(--text-dark)' }}>
                      {r.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reply Input Bar */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="input-field"
            style={{ flex: 1, paddingLeft: '12px' }}
            placeholder="Write a helpful response..."
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSendReply(); }}
          />
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={handleSendReply}>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};
