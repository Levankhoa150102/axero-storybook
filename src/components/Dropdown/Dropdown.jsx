import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../../shared/variables.css";
import "./Dropdown.css";
import "../Button/Button.css"

/**
 * Dropdown component for Axero navigation menus
 * Renders a dropdown menu with toggle functionality
 */
export const Dropdown = ({
  buttonText,
  buttonIcon,
  iconOnly = false,
  items = [],
  position = "left",
  className = "",
  onItemClick,
  openLeft = false,
  navbar = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item, e) => {
    if (onItemClick) {
      onItemClick(item, e);
    }
    setIsOpen(false);
  };

  const dropdownClasses = [
    className,
    isOpen ? "open" : "",
    openLeft ? "open-left" : "",
  ].filter(Boolean).join(" ");

  // Render button content based on props
  const renderButtonContent = () => {
    const showCaret = !iconOnly;
    
    if (iconOnly && buttonIcon) {
      // Case 1: Icon only (no text, no caret)
      return <i className={buttonIcon}></i>;
    }
    
    if (buttonIcon) {
      // Case 2: Icon + caret (default)
      return (
        <>
          <i className={buttonIcon}></i> {showCaret && <span className="caret"></span>}
        </>
      );
    }
    
    // Case 3: Text + caret only (no icon)
    return (
      <>
        {buttonText} {showCaret && <span className="caret"></span>}
      </>
    );
  };

  return (
    <div className={navbar ? "navbar" : ""}>
<div 
      className={dropdownClasses}
      ref={dropdownRef}
      {...props}
    >
      <a 
        className="btn dropdown-toggle" 
        href="#"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label={iconOnly ? buttonText : undefined}
      >
        {renderButtonContent()}
      </a>
      
      <ul className={`dropdown-menu ${position === "left" ? "pull-right" : ""}`}>
        {items.map((item, index) => (
          <li key={item.id || index} className={item.className || ""}>
            <a
              href={item.href || "#"}
              onClick={(e) => handleItemClick(item, e)}
              title={item.title || item.text}
            >
              {item.icon && <i className={item.icon}></i>}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
};

Dropdown.propTypes = {
  /**
   * Text to display on the dropdown button
   */
  buttonText: PropTypes.string,
  /**
   * FontAwesome icon class for the button (e.g., 'fas fa-bars')
   */
  buttonIcon: PropTypes.string,
  /**
   * Show only the icon without text (hides caret)
   */
  iconOnly: PropTypes.bool,
  /**
   * Array of dropdown menu items
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
      className: PropTypes.string,
    })
  ),
  /**
   * Position of the dropdown menu (left or right)
   */
  position: PropTypes.oneOf(["left", "right"]),
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
  /**
   * Callback function when an item is clicked
   */
  onItemClick: PropTypes.func,
  /**
   * Open the dropdown menu to the left
   */
  openLeft: PropTypes.bool,
  /**
   * Open the dropdown menu to the navbar
   */
  navbar: PropTypes.bool,
};

export default Dropdown;
