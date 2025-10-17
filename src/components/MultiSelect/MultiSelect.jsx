import React, { useState } from 'react';
import { useRef } from 'react';
import './MultiSelect.css';

/**
 * MultiSelect component
 * - Shows tags for selected options
 * - Filters options as user types
 * - Displays dropdown with matching options
 */
export function MultiSelect({ options = [], placeholder = 'Select...', onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const timeoutRef = useRef(null);

  // Filter options by input value and exclude already selected
  const filteredOptions = inputValue
    ? options.filter(
      opt =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selected.some(sel => sel.value === opt.value)
    )
    : options.filter(opt => !selected.some(sel => sel.value === opt.value));

  const handleInputChange = e => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
    setHasTyped(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOptionClick = option => {
    const newSelected = [...selected, option];
    setSelected(newSelected);
    setInputValue('');
    setShowDropdown(false);
    setHasTyped(false);
    if (onChange) onChange(newSelected);
  };

  const handleTagRemove = value => {
    const newSelected = selected.filter(tag => tag.value !== value);
    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <div className="multi-select-root">
      <div className="multi-select-input-box">
        {selected.map(tag => (
          <span className="multi-select-tag" key={tag.value}>
            {tag.label}
            <button
              type="button"
              className="multi-select-tag-remove"
              onClick={() => handleTagRemove(tag.value)}
              aria-label={`Remove ${tag.label}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          className="multi-select-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {showDropdown && !inputValue && (
        <div className="multi-select-dropdown multi-select-empty">Type first or last name</div>
      )}
      {showDropdown && inputValue && loading && (
        <div className="multi-select-dropdown multi-select-empty">Loading people...</div>
      )}
      {showDropdown && inputValue && !loading && filteredOptions.length > 0 && (
        <div className="multi-select-dropdown">
          {filteredOptions.map(opt => (
            <div
              key={opt.value}
              className="multi-select-option"
              onMouseDown={() => handleOptionClick(opt)}
            >
              {opt.avatar && (
                <span className="multi-select-avatar">
                  <img src={opt.avatar} alt={opt.label} style={{ width: 35, height: 35, borderRadius: '50%', marginRight: 5 }} />
                </span>
              )}
              <div className='multi-select-info'>
                {opt.label}
                <div className='multi-select-role'>
                  {opt.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDropdown && inputValue && !loading && filteredOptions.length === 0 && (
        <div className="multi-select-dropdown multi-select-empty">No options found</div>
      )}
    </div>
  );
}
