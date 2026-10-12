import React from 'react';

export const Showcase: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-showcase">
      {/* DESKTOP SHOWCASE INFO PANEL */}
      <div className="showcase-info">
        <div className="showcase-badge">Sri Lanka Smart Farming</div>
        <h1 className="showcase-title">
          <div className="logo-badge">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTQwIDYwIEw2MCA0MCBMNDAgMjAgTDIwIDQwIFoiIGZpbGw9IiMyRDZBNEYiLz48cGF0aCBkPSJNNjAgNDAgTDgwIDYwIEw2MCA4MCBMNDAgNjAgWiIgZmlsbD0iIzUyQjc4OCIvPjxwYXRoIGQ9Ik01MCA1MCBMNjUgMzUgTDUwIDIwIEwzNSAzNSBaIiBmaWxsPSIjZmZmIi8+PC9zdmc+"
              alt="ZFARM Logo"
            />
          </div>
          ZFARM
        </h1>
        <p className="showcase-subtitle">
          A purpose-built agricultural super-app blueprint engineered to digitize, optimize, and empower the Sri Lankan farming ecosystem. Contains interactive 9-sided marketplace components, offline disease diagnostics, ledgers, and state complaints pipelines.
        </p>
        <ul className="features-list">
          <li><i className="ti ti-circle-check-filled"></i> <strong>Trilingual Toggle Engine</strong> — English, Sinhala, Tamil layouts</li>
          <li><i className="ti ti-circle-check-filled"></i> <strong>Interactive Crop Stock Map</strong> — aggregation for transparency</li>
          <li><i className="ti ti-circle-check-filled"></i> <strong>Offline Inference Scanner</strong> — diagnostics on 12 local crop types</li>
          <li><i className="ti ti-circle-check-filled"></i> <strong>9-Sided Marketplace Switcher</strong> — Farmer, Business, State roles</li>
          <li><i className="ti ti-circle-check-filled"></i> <strong>Receipt OCR Scanner</strong> — instant cash slip logging simulation</li>
          <li><i className="ti ti-circle-check-filled"></i> <strong>Official Grievance Pipeline</strong> — GPS telemetry automated routing</li>
          <li><i className="ti ti-circle-check-filled"></i> <strong>Expanded Cultivation & Livestock</strong> — track paddy to poultry in one ledger</li>
        </ul>
        <div className="showcase-cta">
          💡 Use the interactive mobile device mockup on the right to test all features.
        </div>
      </div>

      {/* MOBILE EMBEDDED DEVICE FRAME */}
      <div className="device-frame">
        <div className="device-notch">
          <div className="device-camera"></div>
        </div>
        <div id="app">
          {children}
        </div>
      </div>
    </div>
  );
};
