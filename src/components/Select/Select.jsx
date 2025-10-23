import React from 'react';
import './Select.css';

export function Select({ options = [], value, onChange, disabled = false, className = '', ...props }) {
    return (
        <label className='axero-select-container'>
            <span className="input-label">{props.label}</span>
              <select
                  className={`axero-select${className ? ' ' + className : ''}`}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                {...props}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    );
}
