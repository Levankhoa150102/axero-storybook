import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../../shared/variables.css";
import "./Dropdown.css";
import "../Button/Button.css"

/**
 * Dropdown component for Axero navigation menus
 * Renders a dropdown menu with toggle functionality
 */
export const Dropdown = ({
  buttonText,
  buttonIcon,
  iconOnly = false,
  items = [],
  position = "left",
  className = "",
  onItemClick,
  openLeft = false,
  navbar = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item, e) => {
    if (onItemClick) {
      onItemClick(item, e);
    }
    setIsOpen(false);
  };

  const dropdownClasses = [
    className,
    isOpen ? "open" : "",
    openLeft ? "open-left" : "",
  ].filter(Boolean).join(" ");

  // Render button content based on props
  const renderButtonContent = () => {
    const showCaret = !iconOnly;

    if (iconOnly && buttonIcon) {
      // Case 1: Icon only (no text, no caret)
      return <i className={buttonIcon}></i>;
    }

    if (buttonIcon) {
      // Case 2: Icon + caret (default)
      return (
        <>
          <i className={buttonIcon}></i> {showCaret && <span className="caret"></span>}
        </>
      );
    }

    // Case 3: Text + caret only (no icon)
    return (
      <>
        {buttonText} {showCaret && <span className="caret"></span>}
      </>
    );
  };

  return (
    <div className={navbar ? "navbar" : ""}>
      <div
        className={dropdownClasses}
        ref={dropdownRef}
        {...props}
      >
        <a
          className="btn dropdown-toggle"
          href="#"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-label={iconOnly ? buttonText : undefined}
        >
          {renderButtonContent()}
        </a>

        <ul className={`dropdown-menu ${position === "left" ? "pull-right" : ""}`}>
          {items.map((item, index) => (
            <li key={item.id || index} className={item.className || ""}>
              <a
                href={item.href || "#"}
                onClick={(e) => handleItemClick(item, e)}
                title={item.title || item.text}
              >
                {item.icon && <i className={item.icon}></i>}
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

Dropdown.propTypes = {
  /**
   * Text to display on the dropdown button
   */
  buttonText: PropTypes.string,
  /**
   * FontAwesome icon class for the button (e.g., 'fas fa-bars')
   */
  buttonIcon: PropTypes.string,
  /**
   * Show only the icon without text (hides caret)
   */
  iconOnly: PropTypes.bool,
  /**
   * Array of dropdown menu items
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
      className: PropTypes.string,
    })
  ),
  /**
   * Position of the dropdown menu (left or right)
   */
  position: PropTypes.oneOf(["left", "right"]),
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
  /**
   * Callback function when an item is clicked
   */
  onItemClick: PropTypes.func,
  /**
   * Open the dropdown menu to the left
   */
  openLeft: PropTypes.bool,
  /**
   * Open the dropdown menu to the navbar
   */
  navbar: PropTypes.bool,
};

/**
 * DropdownSelect component with Input-style appearance
 * Renders a dropdown that looks like an input field with dropdown arrow
 */
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

export default Dropdown;
