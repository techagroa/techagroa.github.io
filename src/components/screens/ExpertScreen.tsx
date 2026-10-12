import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { askGoviyaAI } from '../../services/ai';

export const ExpertScreen: React.FC = () => {
  const {
    setActiveTab,
    chatMessages,
    addChatMessage,
    language,
    user,
    showToast,
    t
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isSending]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputVal;
    if (!textToSend.trim() || isSending) return;

    const userMsg = {
      id: 'm_' + Date.now(),
      sender: 'user' as const,
      text: textToSend.trim(),
      timestamp: Date.now()
    };

    addChatMessage(userMsg);
    setInputVal('');
    setIsSending(true);

    try {
      const response = await askGoviyaAI(userMsg.text, {
        language,
        district: user.district,
        season: 'Yala Season 2026'
      });

      const botMsg = {
        id: 'bot_' + Date.now(),
        sender: 'bot' as const,
        text: response.text,
        citations: response.citations,
        timestamp: Date.now()
      };

      addChatMessage(botMsg);
    } catch (err) {
      showToast('GoviyaAI response failed. Please try again.');
      setInputVal(textToSend); // preserve unsent draft
    } finally {
      setIsSending(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Browser speech recognition unavailable. You can type in Sinhala, Tamil or English.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'si' ? 'si-LK' : language === 'ta' ? 'ta-LK' : 'en-US';
    recognition.interimResults = false;

    setIsListening(true);
    showToast('Listening... Speak now');

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInputVal(transcript);
      setIsListening(false);
      handleSend(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      showToast('Speech recognition ended');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleReadAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
      showToast('Reading response aloud...');
    } else {
      showToast('Speech synthesis not available in this browser');
    }
  };

  return (
    <div className="screen active" id="screen-expert">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
        <span className="bold" style={{ fontSize: '15px' }}>{t('aiExpert', 'AI Expert Chat')}</span>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '620px', padding: '12px' }}>
        <div className="flex-row-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
          <span className="bold" style={{ fontSize: '13px', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="ti ti-robot"></i> GoviyaAI Agronomy Expert
          </span>
          <span className="badge badge-green">Verified Knowledge Base</span>
        </div>

        {/* Suggested Quick Questions */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
          {[
            'Paddy Blast symptoms & remedy',
            'Subsidized urea schedule',
            'Tomato whitefly control'
          ].map((prompt, pIdx) => (
            <button
              key={pIdx}
              type="button"
              className="filter-chip"
              style={{ fontSize: '10px', padding: '3px 8px', whiteSpace: 'nowrap' }}
              onClick={() => handleSend(prompt)}
            >
              💡 {prompt}
            </button>
          ))}
        </div>

        {/* Chat Logs */}
        <div className="chat-container" id="expert-chat-box" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px 0' }}>
          {chatMessages.map(msg => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
            >
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>{msg.text}</div>

              {msg.citations && msg.citations.length > 0 && (
                <div style={{ fontSize: '10px', opacity: 0.85, marginTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.3)', paddingTop: '4px' }}>
                  <strong>Citations:</strong> {msg.citations.join('; ')}
                </div>
              )}

              {msg.sender === 'bot' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '12px', opacity: 0.8 }}
                    onClick={() => handleReadAloud(msg.text)}
                    title="Read aloud"
                  >
                    <i className="ti ti-volume"></i> Read
                  </button>
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="chat-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'auto', alignSelf: 'flex-start' }}>
              <i className="ti ti-loader animate-spin"></i>
              <span>GoviyaAI researching official circulars...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="flex-gap-8" style={{ marginTop: '6px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '42px', padding: 0, flexShrink: 0, color: isListening ? 'var(--destructive-red)' : 'inherit' }}
            onClick={handleVoiceInput}
            title="Speech input"
          >
            <i className="ti ti-microphone"></i>
          </button>
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '14px', flex: 1 }}
            id="chat-user-input"
            placeholder="Type in Sinhala, Tamil, or English..."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '42px', padding: 0, flexShrink: 0 }}
            onClick={() => handleSend()}
            disabled={isSending}
          >
            <i className="ti ti-send"></i>
          </button>
        </div>

        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
          🎙️ Trilingual GoviyaAI: Type or speak your inquiry.
        </div>
      </div>
    </div>
  );
};
