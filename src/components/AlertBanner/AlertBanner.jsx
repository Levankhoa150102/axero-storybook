import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './AlertBanner.css';

/**
 * AlertBanner component for displaying messages - renders raw HTML for AlpineJS usage
 */
export const AlertBanner = ({ 
  message = "Thank you for rating.",
  type = "success",
  showCloseButton = true,
  closable = false,
  autoHide = false,
  autoHideDelay = 3000,
  onClose,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  const getBackgroundClass = () => {
    switch (type) {
      case 'success':
        return 'message-content--success';
      case 'warning':
        return 'message-content--warning';
      case 'error':
        return 'message-content--error';
      case 'info':
        return 'message-content--info';
      default:
        return 'message-content--success';
    }
  };

  return (
    <div id="message-box-wrapper" {...props}>
      <table className="message-box" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td>
              <div className={`message-content ${getBackgroundClass()}`}>
                <span className="message-content-inner">{message}</span>
                {showCloseButton && (
                  <span className="message-content-options">
                    <a className="close-link" href="#" onClick={(e) => {
                      e.preventDefault();
                      if (closable) {
                        handleClose();
                      }
                    }}>
                      <i className="icon-remove"></i>
                    </a>
                  </span>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Static method to generate raw HTML for AlpineJS usage
AlertBanner.generateHTML = (options = {}) => {
  const {
    message = "Thank you for rating.",
    type = "success",
    showCloseButton = true,
    closable = false,
    id = "message-box-wrapper"
  } = options;

  const getBackgroundClass = () => {
    switch (type) {
      case 'success':
        return 'message-content--success';
      case 'warning':
        return 'message-content--warning';
      case 'error':
        return 'message-content--error';
      case 'info':
        return 'message-content--info';
      default:
        return 'message-content--success';
    }
  };

  const closeButtonHTML = showCloseButton 
    ? `<span class="message-content-options"><a class="close-link" href="#"><i class="icon-remove"></i></a></span>`
    : '';

  return `<div id="${id}">
    <table class="message-box" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td>
            <div class="message-content ${getBackgroundClass()}">
              <span class="message-content-inner">${message}</span>
              ${closeButtonHTML}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`;
};

AlertBanner.propTypes = {
  /**
   * Message text to display
   */
  message: PropTypes.string,
  /**
   * AlertBanner type for styling
   */
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  /**
   * Show close button
   */
  showCloseButton: PropTypes.bool,
  /**
   * Allow closing the alert banner (default false)
   */
  closable: PropTypes.bool,
  /**
   * Auto hide after delay
   */
  autoHide: PropTypes.bool,
  /**
   * Auto hide delay in milliseconds
   */
  autoHideDelay: PropTypes.number,
  /**
   * Callback when AlertBanner is closed
   */
  onClose: PropTypes.func,
};
