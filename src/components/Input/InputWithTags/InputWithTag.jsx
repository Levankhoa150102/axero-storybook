import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../../shared/variables.css';
import './InputWithTags.css';
import { Tags } from '../../Tags/Tags.jsx';



const buildLabelClasses = (required, disabled) => [
    'input-label',
    required ? 'input-label--required' : '',
    disabled ? 'input-label--disabled' : ''
].filter(Boolean).join(' ');

const generateId = (id) => id || `input-${Math.random().toString(36).substr(2, 9)}`;

const ErrorMessage = ({ error, errorMessage, inputId }) => {
    if (!error || !errorMessage) return null;

    return (
        <div id={`${inputId}-error`} className="input-error" role="alert">
            {errorMessage}
        </div>
    );
};

const InputLabel = ({ label, description, required, inputId, labelClasses }) => {
    if (!label) return null;

    return (
        <label htmlFor={inputId} className={labelClasses}>
            {label}
            {description && <span className="input-description"> ({description}) </span>}
            {required && <span className="input-required"> * </span>}
        </label>
    );
};



export const InputWithTags = ({
    label = 'Add tags',
    placeholder = 'Enter tags...',
    tags = [],
    onTagsChange,
    showDropdown = true,
    disabled = false,
    error = false,
    errorMessage,
    required = false,
    className = '',
    id,
    ...props
}) => {
    const inputId = generateId(id);
    const [currentTags, setCurrentTags] = useState(tags);
    const [inputValue, setInputValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        setCurrentTags(tags);
    }, [tags]);

    const handleRemoveTag = (tagIndex, tagValue) => {
        const newTags = currentTags.filter((_, index) => index !== tagIndex);
        setCurrentTags(newTags);
        if (onTagsChange) {
            onTagsChange(newTags);
        }
    };

    const handleAddTag = (tag) => {
        if (!currentTags.includes(tag)) {
            const newTags = [...currentTags, tag];
            setCurrentTags(newTags);
            if (onTagsChange) {
                onTagsChange(newTags);
            }
        }
        setIsDropdownOpen(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            handleAddTag(inputValue.trim());
            setInputValue('');
        }
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const labelClasses = buildLabelClasses(required, disabled);
    const containerClasses = [
        'input-tags-container',
        disabled ? 'input-tags-container--disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="input-wrapper">
            <InputLabel
                label={label}
                required={required}
                inputId={inputId}
                labelClasses={labelClasses}
            />
            
            <div className={containerClasses}>
                {currentTags.length > 0 && (
                    <div className="input-tags-wrapper">
                        <Tags
                            tags={currentTags}
                            editMode={!disabled}
                            onRemove={handleRemoveTag}
                        />
                    </div>
                )}
                
                <div className="input-tags-field">
                    <input
                        id={inputId}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder={currentTags.length === 0 ? placeholder : ''}
                        disabled={disabled}
                        className="input-tags-input"
                        aria-invalid={error}
                        aria-describedby={error && errorMessage ? `${inputId}-error` : undefined}
                        {...props}
                    />
                    
                    {showDropdown && (
                        <button
                            type="button"
                            className={`input-tags-button ${isDropdownOpen ? 'input-tags-button--active' : ''}`}
                            onClick={toggleDropdown}
                            disabled={disabled}
                            aria-label="Show available tags"
                        >
                            <i className="fas fa-plus-square fa-lg"></i>
                        </button>
                    )}
                </div>

                {isDropdownOpen && (
                    <div className="input-tags-dropdown">
                        <div className="input-tags-dropdown-content">
                            {/* Blank dropdown - content will be added later */}
                        </div>
                    </div>
                )}
            </div>

            <ErrorMessage error={error} errorMessage={errorMessage} inputId={inputId} />
        </div>

        
    );
};

InputWithTags.propTypes = {
    /**
     * Label text for the input
     */
    label: PropTypes.string,
    /**
     * Placeholder text
     */
    placeholder: PropTypes.string,
    /**
     * Current array of tags
     */
    tags: PropTypes.arrayOf(PropTypes.string),
    /**
     * Callback when tags array changes
     */
    onTagsChange: PropTypes.func,
    /**
     * Whether to show the dropdown button
     */
    showDropdown: PropTypes.bool,
    /**
     * Whether the input is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Whether the input has an error
     */
    error: PropTypes.bool,
    /**
     * Error message to display
     */
    errorMessage: PropTypes.string,
    /**
     * Whether the field is required
     */
    required: PropTypes.bool,
    /**
     * Additional CSS classes
     */
    className: PropTypes.string,
    /**
     * Input ID for accessibility
     */
    id: PropTypes.string,
};