import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../shared/variables.css";
import "./Radio.css";

/**
 * Radio component for selecting one option from multiple choices
 * Uses label and list structure for better accessibility
 */
export const Radio = ({
  label,
  name,
  options = [],
  value = "",
  onChange,
  required = false,
  className = "",
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const radioGroupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (optionValue, e) => {
    setSelectedValue(optionValue);
    if (onChange) {
      onChange(optionValue, e);
    }
  };

  // Update selectedValue when value prop changes
  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <fieldset className={`radio-wrapper ${className}`} {...props}>
      {label && (
        <legend className="radio-label">
          {label}
          {required && <span className="radio-required"> *</span>}
        </legend>
      )}

      <ul 
        className="radio-list"
        role="radiogroup"
        aria-labelledby={radioGroupId}
        aria-required={required}
      >
        {options.map((option, index) => {
          const optionId = `${radioGroupId}-option-${index}`;
          const isSelected = selectedValue === option.value;

          return (
            <li key={option.value || index} className="radio-item">
              <label 
                className="radio-option"
                htmlFor={optionId}
              >
                <input
                  id={optionId}
                  type="radio"
                  name={name || radioGroupId}
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => handleChange(option.value, e)}
                  required={required}
                />
                <span className="radio-text">
                  {option.label} {option.description && option.description}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

Radio.propTypes = {
  /**
   * Label text for the radio group
   */
  label: PropTypes.string,
  /**
   * Name attribute for the radio group
   */
  name: PropTypes.string,
  /**
   * Array of radio options
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
  /**
   * Currently selected value
   */
  value: PropTypes.string,
  /**
   * Callback function when selection changes
   */
  onChange: PropTypes.func,
  /**
   * Whether the field is required
   */
  required: PropTypes.bool,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};

export default Radio;