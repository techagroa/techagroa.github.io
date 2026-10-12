import React from 'react';
import { useApp } from '../../context/AppContext';

export const LessonReaderModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    selectedLesson,
    completeLesson
  } = useApp();

  if (activeModal !== 'modal-lesson' || !selectedLesson) return null;

  return (
    <div className="modal-overlay active" id="modal-lesson" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-sheet" style={{ height: '90%', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>{selectedLesson.icon}</span>
            <div>
              <span className="modal-title" style={{ fontSize: '15px' }}>{selectedLesson.title}</span>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {selectedLesson.category} · {selectedLesson.readTime}
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '4px' }}>
          {selectedLesson.content.map((sec, idx) => (
            <div key={idx} style={{ background: 'var(--background-slate)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                {sec.heading}
              </div>
              <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-dark)', marginBottom: sec.bullets ? '8px' : 0 }}>
                {sec.text}
              </p>
              {sec.bullets && (
                <ul style={{ paddingLeft: '18px', fontSize: '12px', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx} style={{ marginBottom: '4px' }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Key Takeaways */}
          <div style={{ background: 'var(--primary-green-light)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--secondary-accent)' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="ti ti-bulb"></i> Key DOA Agricultural Takeaways
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '12px', color: 'var(--primary-dark)', lineHeight: 1.5 }}>
              {selectedLesson.keyTakeaways.map((k, kIdx) => (
                <li key={kIdx} style={{ marginBottom: '4px' }}>{k}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '10px', display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${selectedLesson.completed ? 'btn-secondary' : 'btn-primary'}`}
            style={{ flex: 1 }}
            onClick={() => {
              completeLesson(selectedLesson.id);
              closeModal();
            }}
          >
            {selectedLesson.completed ? '✓ Lesson Completed' : 'Mark as Read & Completed'}
          </button>
        </div>
      </div>
    </div>
  );
};
