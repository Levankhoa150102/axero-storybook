import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Button.css';
import { Icon } from '../Icons/Icons.jsx';

/**
 * Primary UI component for user interaction - renders as HTML <button> element
 */
export const Button = ({ 
  backgroundColor, 
  size = '', 
  label, 
  iconClassName,
  iconSize,
  iconPosition = 'prefix', 
  iconOnly = false,
  processing = false,
  enableProcessing = false,
  processingLabel = 'Processing...',
  processingDuration = 3000,
  onProcessingComplete,
  className = '',
  ...props 
}) => {
  const [isInternalProcessing, setIsInternalProcessing] = useState(false);

  // Determine if processing (external or internal)
  const isProcessing = processing || isInternalProcessing;

  // Handle click with processing logic
  const handleClick = async (e) => {
    if (isProcessing) return;

    // If enableProcessing is true, start internal processing
    if (enableProcessing) {
      setIsInternalProcessing(true);

      // Call original onClick if provided
      if (onClick) {
        await onClick(e);
      }

      // Simulate processing time
      setTimeout(() => {
        setIsInternalProcessing(false);
        if (onProcessingComplete) {
          onProcessingComplete();
        }
      }, processingDuration);
    } else {
      // Normal button behavior
      if (onClick) {
        onClick(e);
      }
    }
  };

  // Determine button label
  const buttonLabel = isProcessing && enableProcessing ? processingLabel : label;

  // Build CSS classes - single button style
  const classes = [
    'btn',
    size ? `btn--${size}`: '',
    iconOnly ? 'btn--icon-only' : '',
    isProcessing ? 'processing' : '',
    className ? className : ''
  ].filter(Boolean).join(' ');
  
  // Render icon content
  const renderIcon = () => {
    if (!iconClassName) return null;

    const iconContainerClasses = [
      'btn-icon',
      !iconOnly ? (iconPosition === 'prefix' ? 'btn-icon--prefix' : 'btn-icon--suffix') : ''
    ].join(' ');

    return (
      <span className={iconContainerClasses}>
        <Icon className={iconClassName} size={iconSize} />
      </span>
    );
  };
  
  // Render button content
  const renderContent = () => {
    if (iconOnly) {
      return renderIcon();
    }
    
    if (iconPosition === 'prefix') {
      return (
        <>
          {renderIcon()}
          {buttonLabel}
        </>
      );
    } else {
      return (
        <>
          {buttonLabel}
          {renderIcon()}
        </>
      );
    }
  };
  
  // Separate onClick from other props to avoid override
  const { onClick, disabled, style, 'aria-label': ariaLabel, ...otherProps } = props;

  return (
    <>
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled || isProcessing}
      aria-label={ariaLabel || (iconOnly ? buttonLabel : undefined)}
      style={backgroundColor ? { backgroundColor, ...style } : style}
      {...otherProps}
      >
      {renderContent()}
    </button>
      </>

    
  );
};

Button.propTypes = {
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string,
  /**
   * FontAwesome class for the icon (e.g., 'fas fa-home')
   */
  iconClassName: PropTypes.string,
  /**
   * Size of the icon in pixels
   */
  iconSize: PropTypes.number,
  /**
   * Position of the icon relative to the label
   */
  iconPosition: PropTypes.oneOf(['prefix', 'suffix']),
  /**
   * Show only the icon without label
   */
  iconOnly: PropTypes.bool,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Show processing state with animated stripes (external control)
   */
  processing: PropTypes.bool,
  /**
   * Enable automatic processing on click
   */
  enableProcessing: PropTypes.bool,
  /**
   * Label to show during processing
   */
  processingLabel: PropTypes.string,
  /**
   * Duration of processing animation in milliseconds
   */
  processingDuration: PropTypes.number,
  /**
   * Callback when processing completes
   */
  onProcessingComplete: PropTypes.func,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};

