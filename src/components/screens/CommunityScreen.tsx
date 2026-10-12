import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SL_DISTRICTS } from '../../data/districtsData';
import { DISC_CATS } from '../../data/discCats';

export const CommunityScreen: React.FC = () => {
  const {
    setActiveTab,
    communityTab,
    setCommunityTab,
    discussions,
    setSelectedDiscussion,
    openModal,
    communityPosts,
    selectedCommunityDistrict,
    setSelectedCommunityDistrict,
    joinedDistricts,
    toggleJoinDistrict,
    addCommunityPost,
    toggleHelpfulPost,
    reportPost,
    undoReportPost,
    deleteCommunityPost,
    user,
    showToast,
    t
  } = useApp();

  const [selectedDiscCat, setSelectedDiscCat] = useState('All');
  const [districtSearch, setDistrictSearch] = useState('');

  // District post composer state
  const [postType, setPostType] = useState<'question' | 'tip' | 'price' | 'alert'>('question');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Speech recognition not supported in this browser. Please type your post.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    showToast('Listening... Speak now');

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setPostBody(prev => (prev ? `${prev} ${transcript}` : transcript));
      setIsRecording(false);
      showToast('Voice transcribed successfully!');
    };

    recognition.onerror = () => {
      setIsRecording(false);
      showToast('Could not capture voice. Please type your post.');
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handlePostSubmit = async () => {
    if (!postTitle.trim()) {
      showToast('Please enter a post title');
      return;
    }
    if (!postBody.trim()) {
      showToast('Please enter post details');
      return;
    }
    await addCommunityPost(postTitle.trim(), postBody.trim(), postType, selectedCommunityDistrict);
    setPostTitle('');
    setPostBody('');
  };

  // Filtered discussions
  const filteredDiscussions = discussions.filter(d => {
    if (selectedDiscCat !== 'All' && d.category !== selectedDiscCat) return false;
    return true;
  });

  // Posts for selected district
  const districtPosts = communityPosts.filter(
    p => p.district.toLowerCase() === selectedCommunityDistrict.toLowerCase()
  );

  const isJoined = joinedDistricts.includes(selectedCommunityDistrict);

  return (
    <div className="screen active" id="screen-community">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
        <span className="bold" style={{ fontSize: '15px' }}>{t('farmersCommunity', 'Farmers Community')}</span>
      </div>

      {/* Role / Tab Switcher */}
      <div className="role-switcher-container">
        <button
          className={`role-tab ${communityTab === 'discussions' ? 'active' : ''}`}
          id="ctab-disc"
          onClick={() => setCommunityTab('discussions')}
        >
          💬 <span>{t('tabDiscussions', 'Discussions')}</span>
        </button>
        <button
          className={`role-tab ${communityTab === 'districts' ? 'active' : ''}`}
          id="ctab-dist"
          onClick={() => setCommunityTab('districts')}
        >
          📍 <span>{t('tabDistricts', 'Districts')}</span>
        </button>
      </div>

      {/* ================= TAB 1: DISCUSSIONS ================= */}
      {communityTab === 'discussions' && (
        <div id="community-disc" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>Farmer Q&A Forum</span>
            <button className="btn btn-primary btn-sm" style={{ width: 'auto' }} onClick={() => openModal('modal-new-disc')}>
              <i className="ti ti-plus"></i> <span>{t('newDiscussion', 'New discussion')}</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className="catalog-filters">
            <div
              className={`filter-chip ${selectedDiscCat === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedDiscCat('All')}
            >
              All
            </div>
            {DISC_CATS.map(c => (
              <div
                key={c}
                className={`filter-chip ${selectedDiscCat === c ? 'active' : ''}`}
                onClick={() => setSelectedDiscCat(c)}
              >
                {c}
              </div>
            ))}
          </div>

          {/* Discussion List */}
          {filteredDiscussions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
              <p style={{ color: 'var(--text-muted)' }}>{t('noDiscussions', 'No discussions yet. Start one.')}</p>
            </div>
          ) : (
            filteredDiscussions.map(d => (
              <div
                key={d.id}
                className="card"
                style={{ cursor: 'pointer', padding: '12px', gap: '6px' }}
                onClick={() => {
                  setSelectedDiscussion(d);
                  openModal('modal-discussion');
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="bold" style={{ fontSize: '13.5px', color: 'var(--text-dark)' }}>
                    {d.title}
                  </span>
                  <span className="pill pill-green" style={{ fontSize: '10px', padding: '2px 8px' }}>
                    {d.category}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {d.content}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>By <strong>{d.author}</strong></span>
                  <span><i className="ti ti-message"></i> {d.replies.length} {t('repliesWord', 'replies')}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ================= TAB 2: DISTRICTS ================= */}
      {communityTab === 'districts' && (
        <div id="community-districts-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Joined districts chips */}
          <div id="community-mine" style={{ display: 'flex', gap: '6px', overflowX: 'auto', alignItems: 'center', paddingBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Joined:</span>
            {joinedDistricts.map(d => (
              <button
                key={d}
                className={`filter-chip ${selectedCommunityDistrict === d ? 'active' : ''}`}
                onClick={() => setSelectedCommunityDistrict(d)}
                style={{ whiteSpace: 'nowrap' }}
              >
                📍 {d}
              </button>
            ))}
          </div>

          {/* Selected District Detail Card */}
          <div className="card" id="community-detail" style={{ gap: '10px' }}>
            <div className="card-title-row">
              <span className="card-title" style={{ fontSize: '15px' }}>
                📍 {selectedCommunityDistrict} Farmers Group
              </span>
              <button
                className={`btn btn-sm ${isJoined ? 'btn-secondary' : 'btn-primary'}`}
                style={{ width: 'auto' }}
                onClick={() => toggleJoinDistrict(selectedCommunityDistrict)}
              >
                {isJoined ? 'Joined ✓' : '+ Join District'}
              </button>
            </div>

            <div style={{ background: 'var(--primary-green-light)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--primary-dark)' }}>
              <strong>Regional Crops:</strong> Paddy, Big Onion, Maize, Livestock, Fresh Vegetables
            </div>

            {/* Post Composer */}
            <div style={{ background: 'var(--background-slate)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
                {(['question', 'tip', 'price', 'alert'] as const).map(tType => (
                  <button
                    key={tType}
                    type="button"
                    className={`filter-chip ${postType === tType ? 'active' : ''}`}
                    style={{ fontSize: '10px', padding: '3px 8px' }}
                    onClick={() => setPostType(tType)}
                  >
                    {tType.toUpperCase()}
                  </button>
                ))}
              </div>

              <input
                type="text"
                className="input-field"
                placeholder="Post title..."
                style={{ paddingLeft: '12px' }}
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
              />

              <div style={{ position: 'relative' }}>
                <textarea
                  className="input-field textarea-field"
                  rows={2}
                  placeholder={`Share with ${selectedCommunityDistrict} farmers...`}
                  value={postBody}
                  onChange={e => setPostBody(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  title="Voice input"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    bottom: '8px',
                    background: isRecording ? 'var(--destructive-red)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isRecording ? '#fff' : 'var(--primary-green)',
                    fontSize: '18px',
                    borderRadius: '50%',
                    padding: '4px'
                  }}
                >
                  <i className="ti ti-microphone"></i>
                </button>
              </div>

              <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-end', width: 'auto' }} onClick={handlePostSubmit}>
                Share to {selectedCommunityDistrict}
              </button>
            </div>

            {/* District Post Stream */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              {districtPosts.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '10px 0' }}>
                  No posts yet in {selectedCommunityDistrict}. Be the first to share an update or question!
                </div>
              ) : (
                districtPosts.map(p => {
                  if (p.reported) {
                    return (
                      <div key={p.id} style={{ background: '#FFF3E0', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Post reported and hidden.</span>
                        <button className="btn btn-secondary btn-sm" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => undoReportPost(p.id)}>
                          Undo
                        </button>
                      </div>
                    );
                  }

                  const isAuthor = p.author === user.name;

                  return (
                    <div key={p.id} style={{ background: 'var(--card-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '18px' }}>👨‍🌾</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '12px' }}>{p.author}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.time}</div>
                          </div>
                        </div>
                        <span className={`pill ${p.type === 'alert' ? 'pill-orange' : 'pill-green'}`} style={{ fontSize: '9px' }}>
                          {p.type.toUpperCase()}
                        </span>
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-dark)' }}>{p.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{p.body}</div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '6px', marginTop: '2px' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '2px 8px', fontSize: '11px', width: 'auto' }}
                          onClick={() => toggleHelpfulPost(p.id)}
                        >
                          👍 Helpful ({p.helpfulCount})
                        </button>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          {isAuthor && (
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '2px 8px', fontSize: '10px', color: 'var(--destructive-red)', width: 'auto' }}
                              onClick={() => deleteCommunityPost(p.id)}
                            >
                              Delete
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 8px', fontSize: '10px', color: 'var(--text-muted)', width: 'auto' }}
                            onClick={() => reportPost(p.id)}
                          >
                            Report
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Browse All 25 Districts by Province */}
          <div className="card" style={{ gap: '8px' }}>
            <span className="bold" style={{ fontSize: '13px' }}>{t('allDistricts', 'All districts')} (25)</span>
            <input
              type="search"
              className="input-field"
              id="community-search"
              style={{ paddingLeft: '14px' }}
              placeholder="Search district..."
              value={districtSearch}
              onChange={e => setDistrictSearch(e.target.value)}
            />

            <div id="community-browse" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(SL_DISTRICTS).map(([province, distList]: [string, any]) => {
                const matchedDistricts = distList.filter((d: any) =>
                  d[0].toLowerCase().includes(districtSearch.toLowerCase())
                );
                if (matchedDistricts.length === 0) return null;

                return (
                  <div key={province} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '4px' }}>
                      {province} Province
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {matchedDistricts.map((d: any) => (
                        <div
                          key={d[0]}
                          className="stock-item"
                          style={{ padding: '6px 8px', cursor: 'pointer' }}
                          onClick={() => setSelectedCommunityDistrict(d[0])}
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '12px' }}>{d[0]}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{d[1]}</div>
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--primary-green)' }}>View →</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
