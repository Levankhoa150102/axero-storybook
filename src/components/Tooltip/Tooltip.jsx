import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Tooltip.css';
import { Button } from '../Button/Button';

/**
 * Tooltip component for displaying contextual information - React implementation with jQuery UI styling
 */
export const Tooltip = ({
  text = 'Tooltip text',
  position = 'top',
  trigger = 'hover',
  visible = false,
  className = '',
  children,
  buttonText = 'Hover me',
  buttonVariant = 'primary',
  buttonSize = 'medium',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const updateTooltipPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = -40;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.height; // Position below the trigger
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width;
        break;
      case 'right':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width;
        break;
      default:
        top = -tooltipRect.height - 10;
        left = (triggerRect.width - tooltipRect.width) / 2;
    }

    setTooltipStyle({
      top: top ? `${top}px`: '',
      left: `${left}px`
    });
  };

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure DOM is updated
      setTimeout(updateTooltipPosition, 10);
    }
  }, [isVisible, text, position]);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  // Default button if no children provided
  const defaultButton = (
    <Button variant={buttonVariant} size={buttonSize} label={buttonText}>

    </Button>
  );

  const tooltipClasses = [
    'tooltip',
    'fade in',
    position,
    // isVisible ? '' : '',
    className
  ].filter(Boolean).join(' ');

  /**
   * React Component Structure Documentation:
   * 
   * This React component renders the following HTML structure:
   * 
   
   * 
   * Key differences from generateHTML() output:
   * - Uses React refs for DOM manipulation (triggerRef, tooltipRef)
   * - Dynamic positioning via tooltipStyle state
   * - Conditional rendering with {isVisible &&}
   * - Event handlers for mouse/click interactions
   * - CSS classes applied via tooltipClasses array
   * 
   * The final rendered HTML matches the structure produced by generateHTML()
   * but with dynamic positioning and interactive behavior.
   */
  return (
    // <div className="tooltip-container" style={{ position: 'relative', display: 'inline-block' }} {...props}>
      <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ cursor: trigger === 'click' ? 'pointer' : 'default', position: 'relative' }}
      >
        {children || defaultButton}
        {isVisible && (
        <div
          ref={tooltipRef}
          className={tooltipClasses}
          style={tooltipStyle}
        >
          <div class="tooltip-arrow"></div>
          <div className="tooltip-inner">{text}</div>
        </div>
      )}
      </div>
      </>
      
    // </div>
  );
};

// Add method to generate raw HTML for React tooltip
Tooltip.generateHTML = (options = {}) => {
  const {
    text = 'Tooltip text',
    position = 'top',
    visible = true,
    className = '',
    buttonText = 'Hover me',
    buttonVariant = 'primary',
    buttonSize = 'medium'
  } = options;

  const tooltipClasses = [
    'tooltip',
    position,
    visible ? 'fade' : '',
    className
  ].filter(Boolean).join(' ');

  return `
  <div style="cursor: pointer|default; position: relative;">
    <!-- Button Element (from Button component or children) -->
    <button class="btn btn-${buttonVariant} btn-${buttonSize}" data-component-name="Button">
      ${buttonText}
    </button>
    
    <!-- Tooltip Element (conditionally rendered when isVisible is true) -->
    <div class="tooltip fade in ${position} ${className}">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">${text}</div>
    </div>
  </div>
  `
//   return `
//     <div style="cursor: ${visible ? 'pointer' : 'default'};">
//       <button class="btn btn-${buttonVariant} btn-${buttonSize}">${buttonText}</button>
//     </div>
//     ${visible ? `<div class="${tooltipClasses}" style="display: block;">
//       <div class="tooltip-arrow"></div>
//       <div class="tooltip-inner">${text}</div>
//     </div>` : ''}
//  `;
};

Tooltip.propTypes = {
  /**
   * Text content to display in the tooltip
   */
  text: PropTypes.string,
  /**
   * Position of the tooltip relative to the trigger element
   */
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /**
   * How the tooltip is triggered
   */
  trigger: PropTypes.oneOf(['hover', 'click']),
  /**
   * Whether the tooltip is visible by default
   */
  visible: PropTypes.bool,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
  /**
   * Text for the default button when no children provided
   */
  buttonText: PropTypes.string,
  /**
   * Variant of the default button
   */
  buttonVariant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  /**
   * Size of the default button
   */
  buttonSize: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The element that triggers the tooltip
   */
  children: PropTypes.node,
};
