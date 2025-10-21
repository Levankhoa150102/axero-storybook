import React from 'react';
import '../Modal.css';
import './ModalConfirm.css';

export function ModalConfirm({ open, message, onConfirm, onCancel }) {
    if (!open) return null;
    return (
        <div className="axero-modal-root">
          <div className="axero-modal-overlay" onClick={onCancel} />
          <div className="axero-modal-panel">
            <div className="axero-modal-confirm-content">
              {message}
            </div>
            <div className="axero-modal-confirm-footer">
              <button className="btn axero-confirm-btn" onClick={onConfirm}>Yes</button>
              <button className="btn axero-confirm-btn" onClick={onCancel}>No</button>
            </div>
          </div>
        </div>
    );
}
