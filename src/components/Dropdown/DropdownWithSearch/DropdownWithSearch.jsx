import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DropdownWithSearch.css';

export const DropdownWithSearch = ({
  label,
  placeholder = "Search...",
  options = [],
  value = "",
  onChange = () => {},
  disabled = false,
  required = false,
  error = false,
  errorMessage = "",
  className = "",
  emptyMessage = "No results found"
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
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 0);
    }
  }, [isOpen]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    error && 'dropdown-with-search--error',
    isOpen && 'dropdown-with-search--open'
  ].filter(Boolean).join(' ');

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      {label && (
        <label className="dropdown-with-search__label">
          {label}
          {required && <span className="dropdown-with-search__required">*</span>}
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
            <div className="dropdown-with-search__search-container">
              <div className="dropdown-with-search__search-input-wrapper">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="dropdown-with-search__search-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

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

      {error && errorMessage && (
        <div className="dropdown-with-search__error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

DropdownWithSearch.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  emptyMessage: PropTypes.string,
};