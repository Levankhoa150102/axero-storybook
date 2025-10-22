import React from 'react';
import './Drawer.css';

export function Drawer({ open, onClose, title, children, placement = 'right' }) {
    return (
        <div className={`drawer-root${open ? ' drawer-open' : ''}`}>
            {open &&
                <>
                    <div className="drawer-overlay" onClick={onClose} />
                    <div className={`drawer-panel drawer-panel-${placement}`}>
                        <div className="drawer-header">
                            <span className="drawer-title">{title}</span>
                            <button className="drawer-close" onClick={onClose} aria-label="Close">×</button>
                        </div>
                        <div className="drawer-content">{children}</div>
                        <div className="drawer-footer">
                            <button className="btn btn--extra-large" style={{ minWidth: '150px' }}  onClick={onClose}>Cancel</button>
                            <button className="btn btn--extra-large btn-primary-styles" style={{ minWidth: '150px'}} >Save</button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
