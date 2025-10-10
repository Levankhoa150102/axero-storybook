import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../shared/variables.css';
import './LeftSidebarNavigation.css';

/**
 * Left Sidebar Navigation component for Axero spaces
 */
export const LeftSidebarNavigation = ({ 
  navigationItems = [],
  contentGroupItems = [],
  spaceOptions = [],
  onEditToggle,
  onItemClick,
  ...props 
}) => {
  const [expandedGroups, setExpandedGroups] = useState({ content: true });
  const [activeItemId, setActiveItemId] = useState(null);

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleItemClick = (item, event) => {
    event.preventDefault();
    setActiveItemId(item.id);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const renderNavigationItem = (item) => {
    const itemClasses = [
      'axero-space-navigation-item',
      'sortable',
      item.customClass,
      'item-not-header',
      activeItemId === item.id ? 'active' : ''
    ].filter(Boolean).join(' ');

    return (
      <li
        key={item.id}
        id={`id_${item.id}`}
        data-tab-type={item.tabType}
        data-entity-type={item.entityType}
        data-content-type={item.contentType}
        data-content-id={item.contentId}
        data-custom-class={item.customClass}
        data-sort-order={item.sortOrder}
        className={itemClasses}
      >
        <div>
          <a
            href={item.href || '#'}
            target={item.target || '_self'}
            title={item.title}
            className="axero-space-navigation-link"
            onClick={(e) => handleItemClick(item, e)}
          >
            <div className="axero-space-navigation-item-icon">
              {item.icon && <span className={item.icon}></span>}
            </div>
            <div className="axero-space-navigation-item-name" data-resourcekey={item.resourceKey}>
              {item.name}
            </div>
          </a>
        </div>
      </li>
    );
  };

  const renderContentGroup = () => {
    if (!contentGroupItems || contentGroupItems.length === 0) return null;

    const groupClasses = [
      'axero-space-navigation-item',
      'sortable',
      'ax-space-menu-content',
      'item-header',
      'item-expanded',
      'header-no-icon',
      'header-no-name'
    ].join(' ');

    return (
      <li
        id="id_-7"
        data-tab-type="2"
        data-entity-type="0"
        data-content-type="0"
        data-content-id="0"
        data-custom-class="ax-space-menu-content"
        data-sort-order="7"
        className={groupClasses}
      >
        <div>
        </div>
          <ul>
            {contentGroupItems.map(item => renderNavigationItem(item))}
          </ul>
      </li>
    );
  };

  const renderSpaceOption = (option) => (
    <li key={option.id}>
      <a onClick={option.onClick}>
        <span className={option.icon}></span> {option.name}
      </a>
    </li>
  );

  return (
    <div className="axero-space-menu" {...props}>
      <div id="axero-space-nav" className="axero-space-nav-container">
        <div className="axero-space-navigation">
          <ul id="sortable" className="">
            {navigationItems.map(item => renderNavigationItem(item))}
            {renderContentGroup()}
          </ul>
        </div>
        
        <ul className="axero-space-tab-options visible-desktop">
          <li>
            <a 
              className="axero-space-add-tab-link"  
              id="EditSpaceTabOrderLink"
              onClick={onEditToggle}
            >
              Edit Navigation
            </a>
          </li>
        </ul>
      </div>

      <div id="options">
        {/* start space options */}
        <ul className="axero-space-page-options">      
          {spaceOptions.length > 0 ? (
            spaceOptions.map(option => renderSpaceOption(option))
          ) : (
            <>
              <li>
                <a>
                  <span className="icon-remove-sign"></span> Stop Activity Email
                </a>
              </li>
              
              <li>
                <a>
                  <span className="icon-sitemap"></span> Create Sub Space
                </a>                    
              </li>
              
              <li>
                <a>
                  <span className="icon-cogs"></span> Copy Space
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
      
    </div>
  );
};

LeftSidebarNavigation.propTypes = {
  /**
   * Array of navigation items to display
   */
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    customClass: PropTypes.string,
    tabType: PropTypes.number,
    entityType: PropTypes.number,
    contentType: PropTypes.number,
    contentId: PropTypes.number,
    sortOrder: PropTypes.number,
    resourceKey: PropTypes.string
  })),
  /**
   * Array of content group items (Articles, Blogs, Calendar, etc.)
   */
  contentGroupItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    customClass: PropTypes.string,
    tabType: PropTypes.number,
    entityType: PropTypes.number,
    contentType: PropTypes.number,
    contentId: PropTypes.number,
    sortOrder: PropTypes.number,
    resourceKey: PropTypes.string
  })),
  /**
   * Array of space option items
   */
  spaceOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func
  })),
  /**
   * Callback when edit mode is toggled
   */
  onEditToggle: PropTypes.func,
  /**
   * Callback when a navigation item is clicked
   */
  onItemClick: PropTypes.func,
};

export default LeftSidebarNavigation;
