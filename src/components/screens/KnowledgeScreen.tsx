import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { downloadCropProtectionPdf, playOrDownloadAudioGuide } from '../../services/media';

export const KnowledgeScreen: React.FC = () => {
  const { setActiveTab, lessons, setSelectedLesson, openModal, showToast, t } = useApp();

  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);

  const handleLessonOpen = (lessonId: string) => {
    const found = lessons.find(l => l.id === lessonId);
    if (found) {
      setSelectedLesson(found);
      openModal('modal-lesson');
    }
  };

  const handlePdfDownload = async () => {
    setDownloadingPdf(true);
    try {
      const res = await downloadCropProtectionPdf();
      showToast(`Downloaded ${res.fileName} (${res.size}) & cached in IndexedDB!`);
    } catch (e) {
      showToast('PDF download failed');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleAudioDownload = async () => {
    setPlayingAudio(true);
    try {
      const res = await playOrDownloadAudioGuide();
      showToast(res.message);
    } catch (e) {
      showToast('Audio playback failed');
    } finally {
      setPlayingAudio(false);
    }
  };

  return (
    <div className="screen active" id="screen-knowledge">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
        <span className="bold" style={{ fontSize: '15px' }}>{t('knowledgeHub', 'Knowledge Hub')}</span>
      </div>

      {/* Interactive Learning Tracks */}
      <div className="card">
        <span className="card-title">
          <i className="ti ti-school"></i> <span>{t('learningTracks', 'Cultivation Learning Tracks')}</span>
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {lessons.map(lesson => (
            <div
              key={lesson.id}
              className="stock-item"
              onClick={() => handleLessonOpen(lesson.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="stock-info">
                <span style={{ fontSize: '24px' }}>{lesson.icon}</span>
                <div>
                  <div className="stock-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {lesson.title}
                    {lesson.completed && (
                      <span className="pill pill-green" style={{ fontSize: '9px', padding: '1px 6px' }}>
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="stock-district">{lesson.subtitle} · {lesson.readTime}</div>
                </div>
              </div>
              <i className="ti ti-chevron-right"></i>
            </div>
          ))}
        </div>
      </div>

      {/* Low Data Media Downloads */}
      <div className="card">
        <span className="card-title">
          <i className="ti ti-download"></i> <span>{t('offlineMedia', 'Offline Media Guides')}</span>
        </span>
        <p className="card-subtitle">
          {t('mediaDesc', 'Super compressed manuals & audio guides for low networks.')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* PDF Guide */}
          <div className="stock-item">
            <div className="stock-info">
              <i className="ti ti-file-type-pdf" style={{ fontSize: '24px', color: 'var(--destructive-red)' }}></i>
              <div>
                <div className="stock-name">Crop Protection Guideline.pdf</div>
                <div className="stock-district">420 KB · Micro-PDF manual (Verified DOA Standard)</div>
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handlePdfDownload}
              disabled={downloadingPdf}
              title="Download PDF"
            >
              <i className={`ti ${downloadingPdf ? 'ti-loader animate-spin' : 'ti-download'}`}></i>
            </button>
          </div>

          {/* Audio Guide */}
          <div className="stock-item">
            <div className="stock-info">
              <i className="ti ti-music" style={{ fontSize: '24px', color: '#1565C0' }}></i>
              <div>
                <div className="stock-name">Fertilizer Mixing Audio Guide.mp3</div>
                <div className="stock-district">1.2 MB · Offline voice guide (Trilingual TTS playback)</div>
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleAudioDownload}
              disabled={playingAudio}
              title="Play and cache audio guide"
            >
              <i className={`ti ${playingAudio ? 'ti-player-play-filled' : 'ti-volume'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
