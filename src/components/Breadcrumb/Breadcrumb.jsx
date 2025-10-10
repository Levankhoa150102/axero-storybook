import React from "react";
import PropTypes from "prop-types";
import "../../shared/variables.css";
import "./Breadcrumb.css";

/**
 * Breadcrumb component for Axero space navigation
 * Renders breadcrumb navigation similar to the space header structure
 */
export const Breadcrumb = ({
  titleNameItems = [],
  spaceInfo = null,
  ...props
}) => {
  const renderBreadcrumbItem = (item, index, isLast) => {
    const itemElement = item.href ? (
      <a
        key={item.id || index}
        title={item.title || item.name}
        href={item.href}
        className="axero-breadcrumb-link"
      >
        {item.name}
      </a>
    ) : (
      <>{item.name}</>
    );

    if (isLast) {
      return itemElement;
    }

    return (
      <React.Fragment key={item.id || index}>
        {itemElement}
        &nbsp;
        <i className="icon-caret-right"></i>
        &nbsp;
      </React.Fragment>
    );
  };

  return (
    <div className="axero-space-header-title">
      <div className="axero-space-header-main">
        <div className="axero-space-header-title-name">
          {titleNameItems.map((item, index) =>
            renderBreadcrumbItem(
              item,
              index,
              index === titleNameItems.length - 1
            )
          )}
        </div>

        {spaceInfo && (
          <div className="axero-space-header-title-info">
            {spaceInfo.type}
            {spaceInfo.manageLink && (
              <span className="manage-space">
                <span className="dot">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                <a
                  href={spaceInfo.manageLink.href || "#"}
                  onClick={(e) => handleItemClick(spaceInfo.manageLink, e)}
                >
                  {spaceInfo.manageLink.name || "Manage Space"}
                </a>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  /**
   * Array of title name items to display
   */
  titleNameItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  /**
   * Space information object containing type and optional manage link
   */
  spaceInfo: PropTypes.shape({
    type: PropTypes.string.isRequired,
    manageLink: PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    }),
  }),
};

export default Breadcrumb;
