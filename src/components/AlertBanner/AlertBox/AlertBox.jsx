import React, { useState } from 'react';
import { Button } from '../../Button/Button.jsx';
import './AlertBox.css';

export function AlertBox({ errorMessage, successMessage, onConfirm }) {
    const [confirmed, setConfirmed] = useState(false);

    if (confirmed) {
        return (
            <div className="alert-box alert-box-confirm">
                <div className="alert-box-icon">
                    <i className="fas fa-check-square" aria-hidden="true"></i>
                    <span className="alert-box-message alert-box-message-confirm">{" "}{successMessage}</span>
                </div>
                <Button
                  className="alert-box-confirm-btn"
                  onClick={() => { setConfirmed(false); if (onConfirm) onConfirm(); }}
                  label="Undo"
                />
            </div>
        );
    }

    return (
        <div className="alert-box alert-box-danger-container">
            <div className="alert-box-icon">
                <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                <span className="alert-box-message alert-box-message-danger">{' '}{errorMessage}</span>
            </div>
            <Button
                className="alert-box-danger-btn"
                onClick={() => { setConfirmed(true); if (onConfirm) onConfirm(); }}
                label="Confirm"
                />
        </div>

    );
}
