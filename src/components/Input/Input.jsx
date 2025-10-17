import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Input.css';
import { Button } from '../Button/Button.jsx';
import { Icon } from '../Icons/Icons.jsx';

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

const CheckingMessage = ({ isChecking, checkingMessage, inputId }) => {
    if (!isChecking || !checkingMessage) return null;

    return (
        <div id={`${inputId}-checking`} className="input-checking" role="status">
            {checkingMessage}
        </div>
    );
};

const SuccessMessage = ({ isSuccess, successMessage, inputId }) => {
    if (!isSuccess || !successMessage) return null;

    return (
        <div id={`${inputId}-success`} className="input-success" role="status">
            {successMessage}
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

const InputField = ({ inputId, type, value, handleChange, placeholder, disabled, inputClasses, error, errorMessage, prefix, suffix, onPrefixClick, onSuffixClick, props }) => {
    const hasAdornments = prefix || suffix;
    
    if (hasAdornments) {
        const wrapperClasses = [
            'input-adornments-wrapper',
            error ? 'input-adornments-wrapper--error' : '',
            disabled ? 'input-adornments-wrapper--disabled' : ''
        ].filter(Boolean).join(' ');
        
        const adornmentInputClasses = inputClasses.replace('input', 'input input-with-adornments');
        
        return (
            <div className={wrapperClasses}>
                <PrefixElement prefix={prefix} onPrefixClick={onPrefixClick} />
                <input
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={adornmentInputClasses}
                    aria-invalid={error}
                    aria-describedby={error && errorMessage ? `${inputId}-error` : undefined}
                    {...props}
                />
                <SuffixElement suffix={suffix} onSuffixClick={onSuffixClick} />
            </div>
        );
    }
    
    return (
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
};

const ButtonElement = ({ buttonType, onButtonClick, disabled, buttonText }) => (
    <Button
        type={buttonType}
        onClick={onButtonClick}
        disabled={disabled}
        label={buttonText}
        className="btn-with-input"
    />
);

const PrefixElement = ({ prefix, onPrefixClick }) => {
    if (!prefix) return null;
    
    return (
        <span 
            className="input-prefix"
            onClick={onPrefixClick}
            style={{ cursor: onPrefixClick ? 'pointer' : 'default' }}
        >
            {prefix}
        </span>
    );
};

const SuffixElement = ({ suffix, onSuffixClick }) => {
    if (!suffix) return null;
    
    return (
        <span 
            className="input-suffix"
            onClick={onSuffixClick}
            style={{ cursor: onSuffixClick ? 'pointer' : 'default' }}
        >
            {suffix}
        </span>
    );
};


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
    isChecking = false,
    checkingMessage = '',
    isSuccess = false,
    successMessage = '',
    inputButtonError = false,
    inputButtonErrorMessage,
    prefix,
    suffix,
    onPrefixClick,
    onSuffixClick,
    iconClassName,
    iconSize = 16,
    iconPosition = 'prefix',
    backgroundColor,
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

    // Convert icon properties to prefix/suffix elements
    let finalPrefix = prefix;
    let finalSuffix = suffix;
    
    if (iconClassName) {
        const iconElement = (
            <Icon 
                className={iconClassName}
                size={iconSize}
                style={backgroundColor ? { backgroundColor } : undefined}
            />
        );
        
        if (iconPosition === 'prefix') {
            finalPrefix = iconElement;
        } else if (iconPosition === 'suffix') {
            finalSuffix = iconElement;
        }
    }

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
        prefix: finalPrefix,
        suffix: finalSuffix,
        onPrefixClick,
        onSuffixClick,
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
                    <CheckingMessage isChecking={isChecking} checkingMessage={checkingMessage} inputId={inputId} />
                    <SuccessMessage isSuccess={isSuccess} successMessage={successMessage} inputId={inputId} />
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
                            <CheckingMessage isChecking={isChecking} checkingMessage={checkingMessage} inputId={inputId} />
                            <SuccessMessage isSuccess={isSuccess} successMessage={successMessage} inputId={inputId} />
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
                    <CheckingMessage isChecking={isChecking} checkingMessage={checkingMessage} inputId={inputId} />
                    <SuccessMessage isSuccess={isSuccess} successMessage={successMessage} inputId={inputId} />
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
     * Whether to show checking status
     */
    isChecking: PropTypes.bool,
    /**
     * Checking message to display
     */
    checkingMessage: PropTypes.string,
    /**
     * Whether to show success status
     */
    isSuccess: PropTypes.bool,
    /**
     * Success message to display
     */
    successMessage: PropTypes.string,
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
    /**
     * Prefix content (text, icon, or React element)
     */
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * Suffix content (text, icon, or React element)
     */
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * FontAwesome icon class name (e.g., 'fas fa-search')
     */
    iconClassName: PropTypes.string,
    /**
     * Size of the icon in pixels
     */
    iconSize: PropTypes.number,
    /**
     * Position of the icon (prefix or suffix)
     */
    iconPosition: PropTypes.oneOf(['prefix', 'suffix']),
    /**
     * Background color for the icon
     */
    backgroundColor: PropTypes.string,
    
    withTags: PropTypes.bool,
    
};

/**
 * Input component with integrated Tags functionality
 */

