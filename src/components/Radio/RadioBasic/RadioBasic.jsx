import React from 'react';
import './RadioBasic.css';

export default function RadioBasic({ name = 'radio-basic', options = [], value, onChange, label = "Radio", required = false }) {
    return (
        <>
            <legend className="input-label">
                {label}
                {required && <span className="input-required"> *</span>}
            </legend>
            <div className="radio-basic-root">
                {options.map((opt, i) => (
                    <label key={opt.value || i} className="radio-basic-row">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={(e) => onChange && onChange(opt.value, e)}
                        />
                        <span className="radio-basic-label">{opt.label}</span>
                    </label>
                ))}
            </div>
        </>
    );
}

