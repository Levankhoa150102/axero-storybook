import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Tab.css';

/**
 * Tab component for organizing content into multiple panels
 */
export const Tab = ({
  tabs = [],
  defaultActiveTab = 0,
  onTabChange = () => {},
  className = '',
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(index, tabs[index]);
  };

  const tabClasses = [
    'tab-container',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tabClasses} {...props}>
      {/* Tab Navigation */}
      <div className="tab-nav" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            className={`tab-nav__item ${activeTab === index ? 'tab-nav__item--active' : ''}`}
            onClick={() => handleTabClick(index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            disabled={tab.disabled}
          >
            <span className="tab-nav__label">{tab.label}</span>
            {tab.badge && (
              <span className="tab-nav__badge">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-panel ${activeTab === index ? 'tab-panel--active' : ''}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            id={`tabpanel-${index}`}
            hidden={activeTab !== index}
          >
            {typeof tab.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: tab.content }} />
            ) : (
              tab.content
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Tab.propTypes = {
  /**
   * Array of tab objects with label, content, and optional properties
   */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /**
   * Index of the initially active tab
   */
  defaultActiveTab: PropTypes.number,
  /**
   * Callback function when tab is changed
   */
  onTabChange: PropTypes.func,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};