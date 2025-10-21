import React from 'react';
import './Modal.css';

export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="axero-modal-root">
      <div className="axero-modal-overlay" onClick={onClose} />
      <div className="axero-modal-panel">
        <div className="axero-modal-header">
          <span className="axero-modal-title">{title}</span>
          <button className="axero-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="axero-modal-content">{children}</div>
        {footer && 
        <div className="axero-modal-footer">
            <button className="btn btn-primary-styles">Save changes</button>    
            <button className="btn">Close</button>
        </div>}
      </div>
    </div>
  );
}
