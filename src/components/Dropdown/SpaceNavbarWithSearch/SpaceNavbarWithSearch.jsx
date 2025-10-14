import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../shared/variables.css";
import "../Dropdown.css";
import "./SpaceNavbarWithSearch.css";
import "../../Button/Button.css";

/**
 * SpaceNavbarWithSearch component for Axero space navigation
 * Reuses Dropdown logic with search functionality and custom space list rendering
 */
export const SpaceNavbarWithSearch = ({
  buttonText = "Spaces",
  spaces = [],
  viewAllUrl = "/spaces",
  onSpaceClick,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside (reused from Dropdown)
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpaceClick = (space, e) => {
    if (onSpaceClick) {
      e.preventDefault();
      onSpaceClick(space, e);
    }
    setIsOpen(false);
  };

  const filteredSpaces = spaces.filter((space) =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dropdownClasses = [
    "dropdown",
    "ax-spaces-dropdown",
    "open-left",
    isOpen ? "open" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="navbar">
      <div className={dropdownClasses} ref={dropdownRef} {...props}>
        <a
          href="#"
          className="dropdown-toggle btn visible-desktop"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
        >
          {buttonText} <span className="caret"></span>
        </a>

        <div className="dropdown-menu ax-diamond-hover-box">
          <div className="axero-ajax-content-wrapper ax-nav-widget">
            <div className="ax-diamond-hover-box ax-diamond-hover-box-spaces">
              <ul className="ax-diamond-hover-box-header">
                <li className="nav-header">
                  My Spaces
                  <span className="pull-right">
                    <a title="Spaces" href={viewAllUrl}>
                      View All
                    </a>
                  </span>
                </li>
                <li className="divider"></li>
              </ul>

              <ul className="ax-diamond-hover-box-dropdown ax-diamond-hover-box-dropdown-spaces">
                {filteredSpaces.length > 0 ? (
                  filteredSpaces.map((space) => (
                    <li key={space.id} className="">
                      <a
                        href={space.url}
                        className="space-home-link"
                        onClick={(e) => handleSpaceClick(space, e)}
                      >
                        <img
                          alt={space.name}
                          src={
                            space.image ||
                            "https://anh.axero-demo.com/assets/Themes/default/images/space-default.png"
                          }
                        />
                        <span className="anchor-text">{space.name}</span>
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="no-results">
                    <span>No spaces found</span>
                  </li>
                )}
              </ul>

              <div className="small-loader" style={{ display: "none" }}>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="_4-u2 mbm _2iwp">
                    <div className="_2iwo">
                      <div className="_2iwq">
                        <div className="_2iwr"></div>
                        <div className="_2iws"></div>
                        <div className="_2iwt"></div>
                        <div className="_2iwu"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SpaceNavbarWithSearch.propTypes = {
  /**
   * Text to display on the dropdown button
   */
  buttonText: PropTypes.string,
  /**
   * Array of space objects
   */
  spaces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ),
  /**
   * URL for "View All" link
   */
  viewAllUrl: PropTypes.string,
  /**
   * Callback function when a space is clicked
   */
  onSpaceClick: PropTypes.func,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};

export default SpaceNavbarWithSearch;
