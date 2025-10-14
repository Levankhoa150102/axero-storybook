import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Input.css';
import { Button } from '../Button/Button.jsx';
import { Tags } from '../Tags/Tags.jsx';

// Helper functions
const generateId = (id) => id || `input-${Math.random().toString(36).substr(2, 9)}`;

const buildInputClasses = (error, disabled, className) => [
    'input',
    error ? 'input--error' : '',
    disabled ? 'input--disabled' : '',
    className
].filter(Boolean).join(' ');

const buildLabelClasses = (required, disabled) => [
    'input-label',
    required ? 'input-label--required' : '',
    disabled ? 'input-label--disabled' : ''
].filter(Boolean).join(' ');

const createChangeHandler = (onChange, setCountCharacters) => {
    if (!onChange) return undefined;
    return (e) => {
        setCountCharacters(e.target.value.length);
        onChange(e);
    };
};

// Component parts
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

const ErrorMessage = ({ error, errorMessage, inputId }) => {
    if (!error || !errorMessage) return null;

    return (
        <div id={`${inputId}-error`} className="input-error" role="alert">
            {errorMessage}
        </div>
    );
};

const CharacterCount = ({ showCharacterCount, countCharacters }) => {
    if (!showCharacterCount) return null;

    return (
        <div className="input-character-count">
            Characters: {countCharacters}
        </div>
    );
};

const TextareaField = ({ inputId, value, handleChange, placeholder, disabled, rows, inputClasses, error, errorMessage, props }) => (
    <textarea
        id={inputId}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={inputClasses}
        aria-invalid={error}
        aria-describedby={error && errorMessage ? `${inputId}-error` : undefined}
        {...props}
    />
);

const InputField = ({ inputId, type, value, handleChange, placeholder, disabled, inputClasses, error, errorMessage, props }) => (
    <input
        id={inputId}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        aria-invalid={error}
        aria-describedby={error && errorMessage ? `${inputId}-error` : undefined}
        {...props}
    />
);

const ButtonElement = ({ buttonType, onButtonClick, disabled, buttonText }) => (
    <Button
        type={buttonType}
        onClick={onButtonClick}
        disabled={disabled}
        label={buttonText}
        className="btn-with-input"
    />
);


/**
 * Primary UI component for user input - renders as HTML <input> or <textarea> element
 */
export const Input = ({
    label,
    description,
    placeholder,
    value,
    onChange,
    type = 'text',
    as = 'input',
    rows = 3,
    showCharacterCount = false,
    withButton = false,
    buttonText = 'Submit',
    onButtonClick,
    buttonType = 'button',
    required = false,
    disabled = false,
    error = false,
    errorMessage,
    inputButtonError = false,
    inputButtonErrorMessage,
    className = '',
    id,
    ...props
}) => {
    const inputId = generateId(id);
    const [countCharacters, setCountCharacters] = useState(0);

    useEffect(() => {
        if (value !== undefined && value !== null) {
            setCountCharacters(value.length);
        } else {
            setCountCharacters(0);
        }
    }, [value]);

    const inputClasses = buildInputClasses(error, disabled, className);
    const labelClasses = buildLabelClasses(required, disabled);
    const handleChange = createChangeHandler(onChange, setCountCharacters);

    const commonInputProps = {
        inputId,
        value,
        handleChange,
        placeholder,
        disabled,
        inputClasses,
        error,
        errorMessage,
        props
    };

    const renderInputField = () => {
        if (as === 'textarea') {
            return <TextareaField {...commonInputProps} rows={rows} />;
        }

        return <InputField {...commonInputProps} type={type} />;
    };

    // Textarea always uses full width layout, no button
    if (as === 'textarea') {
        return (
            <div className="input-wrapper">
                <div className="flex-between">
                    <InputLabel
                        label={label}
                        description={description}
                        required={required}
                        inputId={inputId}
                        labelClasses={labelClasses}
                    />
                    <ErrorMessage error={error} errorMessage={errorMessage} inputId={inputId} />
                    <CharacterCount showCharacterCount={showCharacterCount} countCharacters={countCharacters} />
                </div>
                {renderInputField()}
            </div>
        );
    }

    // Input with button layout (70/30 split)
    if (withButton && as === 'input') {
        return (
            <div className="input-wrapper">
                <div className="input-button-container">
                    <div className="input-field-container">
                        <div className="flex-between">
                            <InputLabel
                                label={label}
                                description={description}
                                required={required}
                                inputId={inputId}
                                labelClasses={labelClasses}
                            />
                            <ErrorMessage error={error} errorMessage={errorMessage} inputId={inputId} />
                            <CharacterCount showCharacterCount={showCharacterCount} countCharacters={countCharacters} />
                        </div>
                        {renderInputField()}

                    </div>

                    <div className="button-container">
                        <ButtonElement
                            buttonType={buttonType}
                            onButtonClick={onButtonClick}
                            disabled={disabled}
                            buttonText={buttonText}
                        />
                    </div>
                </div>
                {inputButtonError && (
                    <div className="input-error-message">{inputButtonErrorMessage}</div>
                )}
            </div>
        );
    }

    // Regular input layout (100% width)
    return (
        <>
            <div className="input-wrapper">
                <div className="flex-between">
                    <InputLabel
                        label={label}
                        description={description}
                        required={required}
                        inputId={inputId}
                        labelClasses={labelClasses}
                    />
                    <ErrorMessage error={error} errorMessage={errorMessage} inputId={inputId} />
                    <CharacterCount showCharacterCount={showCharacterCount} countCharacters={countCharacters} />
                </div>
                {renderInputField()}
            </div>

        </>

    );
};

Input.propTypes = {
    /**
     * Label text for the input
     */
    label: PropTypes.string,
    /**
     * Description text that appears after the label and asterisk
     */
    description: PropTypes.string,
    /**
     * Placeholder text
     */
    placeholder: PropTypes.string,
    /**
     * Current value of the input
     */
    value: PropTypes.string,
    /**
     * Change handler function
     */
    onChange: PropTypes.func,
    /**
     * Input type (text, email, password, etc.)
     */
    type: PropTypes.string,
    /**
     * Element to render ('input' or 'textarea')
     */
    as: PropTypes.oneOf(['input', 'textarea']),
    /**
     * Number of rows for textarea
     */
    rows: PropTypes.number,
    /**
     * Whether to show character count for input or textarea
     */
    showCharacterCount: PropTypes.bool,
    /**
     * Whether the field is required
     */
    required: PropTypes.bool,
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
     * Whether to show button for input with button variant
     */
    withButton: PropTypes.bool,
    /**
     * Text to display on the button
     */
    buttonText: PropTypes.string,
    /**
     * Click handler for the button
     */
    onButtonClick: PropTypes.func,
    /**
     * Button type (button, submit, reset)
     */
    buttonType: PropTypes.string,
    /**
     * Whether the input button has an error
     */
    inputButtonError: PropTypes.bool,
    /**
     * Error message to display for input button
     */
    inputButtonErrorMessage: PropTypes.string,
    /**
     * Additional CSS classes
     */
    className: PropTypes.string,
    /**
     * Input ID for accessibility
     */
    id: PropTypes.string,
    
    withTags: PropTypes.bool,
    
};

/**
 * Input component with integrated Tags functionality
 */
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
