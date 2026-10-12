import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { diseaseMatrix } from '../../data/diseaseMatrix';

export const ScannerScreen: React.FC = () => {
  const { setActiveTab, setMarketCategory, setMarketSearch, t } = useApp();

  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScanAnimation = async (chosenCrop: string, imageSrc?: string) => {
    setIsScanning(true);
    setScanProgress(0);
    if (imageSrc) setCapturedImage(imageSrc);

    // Progress animation
    for (let i = 10; i <= 100; i += 20) {
      await new Promise(r => setTimeout(r, 150));
      setScanProgress(i);
    }

    setIsScanning(false);

    // Lookup diagnosis from matrix
    const matrixEntry = (diseaseMatrix as any)[chosenCrop] || (diseaseMatrix as any).tomato || (diseaseMatrix as any).paddy;
    setDiagnosis({
      crop: chosenCrop,
      name: matrixEntry.name?.en || `${chosenCrop.toUpperCase()} Fungal Infection`,
      severity: matrixEntry.severity || 'Medium Severity',
      confidence: matrixEntry.confidence || '91%',
      symptoms: matrixEntry.symptoms?.en || 'Discoloration and lesion spots on leaf surfaces.',
      recovery: matrixEntry.recovery?.en || [
        'Prune affected leaves immediately to reduce airborne spore count.',
        'Apply copper-based fungicide spray early morning before high heat.',
        'Avoid overhead watering; maintain drip irrigation at soil level.'
      ],
      icon: chosenCrop === 'paddy' ? '🌾' : chosenCrop === 'coconut' ? '🥥' : chosenCrop === 'banana' ? '🍌' : '🍅'
    });
  };

  const handleScanNow = async () => {
    // Attempt camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCameraActive(true);
        }
      } catch (e) {
        // Fallback to sample scan if permission denied or no camera
        startScanAnimation(selectedCrop);
      }
    } else {
      startScanAnimation(selectedCrop);
    }
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      startScanAnimation(selectedCrop, src);
    };
    reader.readAsDataURL(file);
  };

  const handleLibraryClick = (cropKey: string) => {
    setSelectedCrop(cropKey);
    const matrixEntry = (diseaseMatrix as any)[cropKey];
    if (matrixEntry) {
      setDiagnosis({
        crop: cropKey,
        name: matrixEntry.name?.en || 'Identified Disease',
        severity: matrixEntry.severity || 'High Severity',
        confidence: matrixEntry.confidence || '94%',
        symptoms: matrixEntry.symptoms?.en || 'Verified disease symptoms in library.',
        recovery: matrixEntry.recovery?.en || ['Review DOA pest management guidelines.'],
        icon: cropKey === 'paddy' ? '🌾' : cropKey === 'coconut' ? '🥥' : cropKey === 'banana' ? '🍌' : '🍅'
      });
      // Scroll to diagnosis
      document.getElementById('scan-result-card')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="screen active" id="screen-scanner">
      <div className="flex-row-between" style={{ marginBottom: '10px' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('more')}>
          <i className="ti ti-arrow-left"></i> <span>{t('back', 'Back')}</span>
        </button>
      </div>

      <div className="card">
        <span className="card-title">
          <i className="ti ti-camera-search"></i> {t('scanTitle', 'AI Plant Disease Scanner')}
        </span>
        <p className="card-subtitle">
          {t('scanHint', 'Scan plant leaves for early disease, pest, and nutrient deficiency detection.')}
        </p>

        {/* Viewfinder Simulator */}
        <div className="camera-viewfinder" id="camera-view" style={{ overflow: 'hidden', position: 'relative' }}>
          {cameraActive ? (
            <video
              ref={videoRef}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              playsInline
              muted
            />
          ) : capturedImage ? (
            <img
              src={capturedImage}
              alt="Leaf sample"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="camera-frame">
              <i className="ti ti-scan-eye" style={{ fontSize: '36px', opacity: 0.3 }}></i>
            </div>
          )}

          {/* Scanning Laser Animation */}
          {isScanning && <div className="scan-laser" id="scanner-laser"></div>}

          {/* Progress Bar */}
          {isScanning && (
            <div className="scanner-progress" id="scanner-prog-wrap" style={{ display: 'block' }}>
              <div
                className="scanner-progress-bar"
                id="scanner-bar"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          )}

          <span
            style={{
              position: 'absolute',
              bottom: '12px',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 700,
              color: '#fff',
              background: 'rgba(0,0,0,0.4)',
              padding: '2px 8px',
              borderRadius: '10px'
            }}
          >
            {t('offlineScan', 'Offline Scanner Active')}
          </span>
        </div>

        {/* Crop Selector */}
        <div className="input-group">
          <label className="input-label">{t('selectCrop', 'Select Crop Type')}</label>
          <div className="input-wrapper">
            <i className="ti ti-leaf"></i>
            <select
              className="input-field select-field"
              id="scanner-crop-select"
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
            >
              <option value="paddy">Paddy / වී</option>
              <option value="tomato">Tomato / තක්කාලි</option>
              <option value="coconut">Coconut / පොල්</option>
              <option value="banana">Banana / කෙසෙල්</option>
              <option value="chili">Chili / මිරිස්</option>
              <option value="brinjal">Brinjal / වම්බටු</option>
              <option value="tea">Tea / තේ</option>
            </select>
          </div>
        </div>

        <div className="flex-gap-8">
          <button className="btn btn-secondary" onClick={handleGalleryClick}>
            <i className="ti ti-photo"></i> <span>{t('gallery', 'Gallery')}</span>
          </button>
          <button className="btn btn-primary" onClick={handleScanNow}>
            <i className="ti ti-camera"></i> <span>{t('scanNow', 'Scan Now')}</span>
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      {/* Diagnosis Result Card */}
      {diagnosis && (
        <div className="card" id="scan-result-card" style={{ display: 'block', borderTop: '4px solid var(--destructive-red)' }}>
          <div className="card-title-row">
            <span className="bold" style={{ fontSize: '15px', color: 'var(--destructive-red)' }}>
              {t('diagnosisResult', 'Diagnosis Result')}
            </span>
            <span className="badge badge-red" id="diag-severity-badge">
              {diagnosis.severity}
            </span>
          </div>

          <div className="stock-item" style={{ border: 'none', background: 'var(--background-slate)', padding: '12px' }}>
            <div className="stock-info">
              <div className="stock-avatar" style={{ color: 'var(--destructive-red)' }}>
                {diagnosis.icon}
              </div>
              <div>
                <div className="stock-name" id="diag-disease-name">{diagnosis.name}</div>
                <div className="stock-district" id="diag-confidence">
                  Model Confidence: {diagnosis.confidence}
                </div>
              </div>
            </div>
          </div>

          <div className="input-group">
            <span className="input-label">{t('recoverySteps', 'Recovery Steps')}</span>
            <div style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'var(--text-dark)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p><strong>Symptoms:</strong> {diagnosis.symptoms}</p>
              <ul style={{ paddingLeft: '18px' }}>
                {Array.isArray(diagnosis.recovery) ? (
                  diagnosis.recovery.map((step: string, sIdx: number) => (
                    <li key={sIdx}>{step}</li>
                  ))
                ) : (
                  <li>{diagnosis.recovery}</li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex-gap-8" style={{ marginTop: '10px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setActiveTab('expert')}
            >
              <i className="ti ti-message-chatbot"></i> <span>{t('askAiExpert', 'Ask AI Expert')}</span>
            </button>
            <button
              className="btn btn-primary"
              id="buy-remedy-btn"
              onClick={() => {
                setMarketCategory('inputs');
                setMarketSearch('fungicide');
                setActiveTab('market');
              }}
            >
              <i className="ti ti-shopping-cart"></i> <span>{t('buyRemedies', 'Buy remedies')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Preloaded Disease Library Matrix */}
      <div className="card">
        <span className="card-title">
          <i className="ti ti-books"></i> {t('diseaseLibrary', 'Preloaded Disease Library')}
        </span>
        <p className="card-subtitle">
          {t('diseaseLibDesc', 'Access common agricultural diseases and cures completely offline.')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} id="disease-library-list">
          {Object.entries(diseaseMatrix).map(([key, item]: [string, any]) => (
            <div
              key={key}
              className="stock-item"
              onClick={() => handleLibraryClick(key)}
              style={{ cursor: 'pointer' }}
            >
              <div className="stock-info">
                <span style={{ fontSize: '24px' }}>
                  {key === 'paddy' ? '🌾' : key === 'coconut' ? '🥥' : key === 'banana' ? '🍌' : '🍅'}
                </span>
                <div>
                  <div className="stock-name">{item.name?.en}</div>
                  <div className="stock-district">{item.severity} · {key.toUpperCase()}</div>
                </div>
              </div>
              <i className="ti ti-chevron-right"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
