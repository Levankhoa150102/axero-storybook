import React from 'react';
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
  className = '',
  variant = '',
  selected = false,
  count = null,
  ...props 
}) => {

  // Build CSS classes - single button style
  const classes = [
    'btn',
    size ? `btn--${size}`: '',
    iconOnly ? 'btn--icon-only' : '',
    variant ? `btn--${variant}` : '',
    selected ? 'btn--selected' : '',
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
    
    const labelContent = (
      <span className="btn-label">
        {label}
        {count !== null && (
          <span className="btn-count">({count})</span>
        )}
      </span>
    );
    
    if (iconPosition === 'prefix') {
      return (
        <>
          {renderIcon()}
          {labelContent}
        </>
      );
    } else {
      return (
        <>
          {labelContent}
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
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (iconOnly ? label : undefined)}
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
   * Additional CSS classes
   */
  className: PropTypes.string,
  /**
   * Button variant (e.g., 'filter')
   */
  variant: PropTypes.string,
  /**
   * Whether the button is in selected state
   */
  selected: PropTypes.bool,
  /**
   * Count to display next to the label
   */
  count: PropTypes.number,
};

