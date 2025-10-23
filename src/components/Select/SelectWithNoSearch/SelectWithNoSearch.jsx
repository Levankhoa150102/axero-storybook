import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../SelectWithSearch/SelectWithSearch.css';

export const SelectWithNoSearch = ({
  options = [],
  value = "",
  className,
  disabled,
  label,
  required = false,
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm("");
      }
    }
  };

  const handleItemClick = (option) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const getSelectedLabel = () => {
    const currentValue = selectedValue || value;
    const selected = options.find(option => option.value === currentValue);
    return selected ? selected.label : placeholder;
  };

  const dropdownClasses = [
    'dropdown-with-search',
    className,
    disabled && 'dropdown-with-search--disabled',
    isOpen && 'dropdown-with-search--open'
  ].filter(Boolean).join(' ');

  return (
    <div className={dropdownClasses} ref={dropdownRef}>  
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required"> *</span>}
        </label>
      )}
      <div className="dropdown-with-search__container">
        <button
          type="button"
          className="dropdown-with-search__trigger"
          onClick={toggleDropdown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="dropdown-with-search__value">
            {getSelectedLabel()}
          </span>
          <b className={`dropdown-with-search__icon ${isOpen ? 'dropdown-with-search__icon--open' : ''}`}></b>
        </button>

        {isOpen && (
          <div className="dropdown-with-search__menu">
            <div className="dropdown-with-search__options">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <button
                    key={option.value || index}
                    type="button"
                    className={`dropdown-with-search__option ${
                      option.value === (selectedValue || value) ? 'dropdown-with-search__option--selected' : ''
                    }`}
                    onClick={() => handleItemClick(option)}
                  >
                    {option.label}
                  </button>
                ))
              ) : (
                <div className="dropdown-with-search__empty">
                  {emptyMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SelectWithNoSearch.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};