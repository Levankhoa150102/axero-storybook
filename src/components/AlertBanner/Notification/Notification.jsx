import React from 'react';
import './Notification.css';

/**
 * Notification - Banner for alerts, info, success, warning, error, etc.
 * Props:
 * - type: 'info' | 'success' | 'warning' | 'error' | 'default'
 * - message: main message text
 * - description: optional description text
 * - action: optional React node (e.g. button)
 */
export const Notification = ({
  type = 'default',
  message,
  description,
  action,
  className = '',
  ...props
}) => {
  const typeClass = `notification--${type}`;
  return (
    <div className={`notification-banner ${typeClass} ${className}`} {...props}>
      <div className="notification-content">
        <div className="notification-message">{message}</div>
        {description && (
          <div className="notification-description">{description}</div>
        )}
        {action && (
          <div className="notification-action">{action}</div>
        )}
      </div>
    </div>
  );
};
