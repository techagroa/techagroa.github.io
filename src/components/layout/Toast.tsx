import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMsg } = useApp();

  return (
    <div id="toast" className={`toast ${toastMsg ? 'show' : ''}`}>
      {toastMsg}
    </div>
  );
};
