import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './ProcessingButton.css';

/**
 * ProcessingButton - A specialized button that shows animated processing state
 * Uses .btn.processing class for styling with diagonal animated stripes
 */
export const ProcessingButton = ({
  label = 'Submit',
  processingLabel = 'Processing...',
  processingDuration = 3000,
  backgroundColor = '#459d3e',
  textColor = '#fff',
  onProcessingComplete,
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async (e) => {
    if (isProcessing || disabled) return;

    setIsProcessing(true);

    // Call original onClick if provided
    if (onClick) {
      try {
        await onClick(e);
      } catch (error) {
        console.error('ProcessingButton onClick error:', error);
      }
    }

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      if (onProcessingComplete) {
        onProcessingComplete();
      }
    }, processingDuration);
  };
  
  const classes = [
    'btn',
    'processing',
    isProcessing ? 'processing-active' : '',
    className
  ].filter(Boolean).join(' ');
  
  const buttonLabel = isProcessing ? processingLabel : label;
  
  const processingColor = backgroundColor === '#459d3e' ? '#51A351' : backgroundColor;

  return (
    <>
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled || isProcessing}
      style={{
        backgroundColor: isProcessing ? processingColor : backgroundColor,
        color: textColor,
        marginBottom: '10px',
        ...props.style
      }}
      {...props}
    >
      {buttonLabel}
    </button>
      
      <button className='btn processing processing-active'>Processing</button>
      </>
  );
};

ProcessingButton.propTypes = {
  /**
   * Default button label
   */
  label: PropTypes.string,
  /**
   * Label to show during processing
   */
  processingLabel: PropTypes.string,
  /**
   * Duration of processing animation in milliseconds
   */
  processingDuration: PropTypes.number,
  /**
   * Background color of the button
   */
  backgroundColor: PropTypes.string,
  /**
   * Text color of the button
   */
  textColor: PropTypes.string,
  /**
   * Callback when processing completes
   */
  onProcessingComplete: PropTypes.func,
  /**
   * Click handler
   */
  onClick: PropTypes.func,
  /**
   * Whether the button is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
  /**
   * Additional inline styles
   */
  style: PropTypes.object,
};