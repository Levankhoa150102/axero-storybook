import React, { useState, useRef } from 'react';
import './IconPicker.css';

const icons = [
    'fa-times', 'fa-fingerprint', 'fa-wheelchair', 'fa-flask',
    'fa-ad', 'fa-address-book', 'fa-address-card', 'fa-id-badge', 'fa-id-card',
    'fa-circle', 'fa-atom', 'fa-tree', 'fa-align-left',
    'fa-align-center', 'fa-align-right', 'fa-align-justify', 'fa-truck',
];

export default function IconPicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [icon, setIcon] = useState(value);
    const ref = useRef(null);

    const filteredIcons = icons.filter(icon => icon.includes(search.toLowerCase()));

    const handleIconClick = (icon) => {
        onChange && onChange(icon);
        setIcon(icon);
        setOpen(false);
    };

    return (
        <div className="icon-picker" ref={ref}>
            <label htmlFor="input" className='input-label'>Icon</label>
            <button
                type="button"
                className="btn icon-picker__button"
                onClick={() => setOpen(!open)}
                aria-label="Pick an icon"
            >
                <i className={`fa ${icon || 'fa-question'}`} />
            </button>
            {open && (
                <div className="icon-picker__dropdown">
                    <div className='icon-picker-wrapper'>
                        <input id="input" type="text" className="input" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: '2px' }} />
                    </div>
                    <div className="icon-picker__grid">
                        {filteredIcons.map(icon => (
                            <button
                                key={icon}
                                type="button"
                                className="btn icon-picker__icon-btn"
                                onClick={() => handleIconClick(icon)}
                                aria-label={icon}
                            >
                                <i className={`fa ${icon}`} />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
