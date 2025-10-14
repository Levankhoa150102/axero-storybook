import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../shared/variables.css";
import "./DropdownSelect.css";
import "../../Button/Button.css"


export const DropdownSelect = ({
  label,
  placeholder = "Select an option...",
  items = [],
  selectedValue = "",
  onSelectionChange,
  required = false,
  disabled = false,
  error = false,
  errorMessage = "",
  className = "",
  ...props
}) => {
  // Initialize with selectedValue or find matching item text
  const [selectedItem, setSelectedItem] = useState(() => {
    if (selectedValue) {
      const foundItem = items.find(item => item.id === selectedValue);
      return foundItem ? foundItem.id : "";
    }
    return "";
  });

  // Update selectedItem when selectedValue prop changes
  useEffect(() => {
    if (selectedValue) {
      const foundItem = items.find(item => item.id === selectedValue);
      if (foundItem) {
        setSelectedItem(foundItem.id);
      }
    }
  }, [selectedValue, items]);

  const dropdownRef = useRef(null);
  const selectId = `dropdown-select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`input-wrapper ${className}`} ref={dropdownRef} {...props}>
      {label && (
        <label className="input-label" htmlFor={selectId}>
          {label}
          {required && <span className="input-required"> *</span>}
        </label>
      )}

      {error && errorMessage && (
        <div className="flex-between">
          <div></div>
          <div>
            <div className="input-error" role="alert">
              {errorMessage}
            </div>
          </div>
        </div>
      )}

      <div className="dropdown-select-container">
        <select
          id={selectId}
          name={`dropdown-select-${label ? label.toLowerCase().replace(/\s+/g, '-') : 'select'}`}
          className={`input dropdown-select-input ${error ? 'input--error' : ''}`}
          value={selectedItem}
          disabled={disabled}
          onChange={(e) => {
            const selectedOption = items.find(item => item.id === e.target.value);
            if (selectedOption) {
              setSelectedItem(selectedOption.id);
              if (onSelectionChange) {
                onSelectionChange(selectedOption);
              }
            }
          }}
          aria-invalid={error}
          required={required}
        >
          <option value="">
            {placeholder}
          </option>
          {items.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

DropdownSelect.propTypes = {
  /**
   * Label text for the dropdown
   */
  label: PropTypes.string,
  /**
   * Placeholder text when no option is selected
   */
  placeholder: PropTypes.string,
  /**
   * Array of dropdown options
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ),
  /**
   * Currently selected value (item id or text)
   */
  selectedValue: PropTypes.string,
  /**
   * Callback function when selection changes
   */
  onSelectionChange: PropTypes.func,
  /**
   * Whether the field is required
   */
  required: PropTypes.bool,
  /**
   * Whether the field is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Whether the field has an error
   */
  error: PropTypes.bool,
  /**
   * Error message to display
   */
  errorMessage: PropTypes.string,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};