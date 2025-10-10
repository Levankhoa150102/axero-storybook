import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Toggle.css';

// Helper functions
const generateId = (id) => id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

const buildToggleClasses = (disabled, className) => [
    'toggle-switch',
    disabled ? 'toggle-switch--disabled' : '',
    className
].filter(Boolean).join(' ');

const buildLabelClasses = (disabled) => [
    'toggle-label',
    disabled ? 'toggle-label--disabled' : ''
].filter(Boolean).join(' ');

/**
 * Toggle switch component for boolean settings - can be used with or without label text.
 * Renders as an accessible HTML checkbox with custom switch styling.
 */
export const Toggle = ({
    label,
    checked,
    onChange,
    disabled = false,
    className = '',
    id,
    ...props
}) => {
    const toggleId = generateId(id);
    const [internalChecked, setInternalChecked] = useState(checked || false);

    // Determine if this is a controlled or uncontrolled component
    const isControlled = checked !== undefined;
    const checkedValue = isControlled ? checked : internalChecked;

    const handleChange = (e) => {
        const newValue = e.target.checked;

        if (!isControlled) {
            setInternalChecked(newValue);
        }

        if (onChange) {
            onChange(e);
        }
    };

    const toggleClasses = buildToggleClasses(disabled, className);
    const labelClasses = buildLabelClasses(disabled);

    return (
        <div className="toggle-wrapper">
            <label htmlFor={toggleId} className={labelClasses}>
                <input
                    id={toggleId}
                    type="checkbox"
                    checked={checkedValue}
                    onChange={handleChange}
                    disabled={disabled}
                    className="toggle-input"
                    {...props}
                />
                <span className={toggleClasses}>
                    <span className="toggle-slider"></span>
                </span>
                {label && <span className="toggle-text">{label}</span>}
            </label>
        </div>
    );
};

Toggle.propTypes = {
    /**
     * Label text for the toggle
     */
    label: PropTypes.string,
    /**
     * Whether the toggle is checked (controlled component)
     */
    checked: PropTypes.bool,
    /**
     * Change handler function
     */
    onChange: PropTypes.func,
    /**
     * Whether the toggle is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Additional CSS classes
     */
    className: PropTypes.string,
    /**
     * Toggle ID for accessibility
     */
    id: PropTypes.string,
};