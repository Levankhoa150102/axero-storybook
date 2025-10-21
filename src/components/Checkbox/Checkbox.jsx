import React from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Checkbox.css';

// Helper functions
const generateId = (id) => id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Checkbox component for boolean selection using native browser styling.
 * Renders as a standard HTML checkbox with default appearance.
 */
export const Checkbox = ({
    label,
    onChange,
    disabled = false,
    className = '',
    id,
    ...props
}) => {
    const checkboxId = generateId(id);

    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    const inputClasses = [
        'checkbox-input',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="checkbox-wrapper">
            <label htmlFor={checkboxId} className="checkbox-label">
                <input
                    id={checkboxId}
                    type="checkbox"
                    onChange={handleChange}
                    disabled={disabled}
                    className={inputClasses}
                    {...props}
                />
                {label && <span className="checkbox-text">{label}</span>}
            </label>            
        </div>
    );
};

Checkbox.propTypes = {
    /**
     * Label text for the checkbox
     */
    label: PropTypes.string,
    /**
     * Change handler function
     */
    onChange: PropTypes.func,
    /**
     * Whether the checkbox is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Additional CSS classes
     */
    className: PropTypes.string,
    /**
     * Checkbox ID for accessibility
     */
    id: PropTypes.string,
};