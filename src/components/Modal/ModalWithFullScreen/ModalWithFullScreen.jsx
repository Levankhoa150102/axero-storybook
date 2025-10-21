import React from 'react';
import './ModalWithFullScreen.css';

export function ModalWithFullScreen({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="axero-modal-fullscreen">
      <div className="axero-modal-panel-fullscreen">
        <div className="axero-modal-header-fullscreen">
          <span className="axero-modal-title-fullscreen">{title}</span>
          <button className="axero-modal-close-fullscreen" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="axero-modal-content-fullscreen">{children}</div>
      </div>
    </div>
  );
}
