import React from 'react';
import PropTypes from 'prop-types';
import './Icons.css';

/**
 * Icon component that renders FontAwesome icons as <i> elements
 */
export const Icon = ({ size = 16, className, ...props }) => {
  const finalClasses = `icon ${className || ''}`.trim();
  const style = size ? { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` } : {};

  return (
    <i
      className={finalClasses}
      style={style}
      {...props}
    />
  );
};

Icon.propTypes = {
  /**
   * FontAwesome 5 class for the icon (e.g., 'fas fa-home')
   */
  className: PropTypes.string.isRequired,
  /**
   * Size of the icon in pixels
   */
  size: PropTypes.number,
};

Icon.defaultProps = {
  size: 16,
};

/**
//  * IconGallery component to showcase all available icons
//  */
// export const IconGallery = () => {
//   const iconNames = [
//     'home', 'user', 'settings', 'search', 'heart', 'star', 'mail', 'phone',
//     'calendar', 'download', 'upload', 'edit', 'trash', 'check', 'x', 'plus',
//     'minus', 'eye', 'eye-off', 'lock', 'unlock', 'menu', 'close', 'delete',
//     'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'caret-right',
//     'caret-left', 'caret-up', 'caret-down', 'chevron-right', 'chevron-left',
//     'chevron-up', 'chevron-down', 'info', 'warning', 'error', 'success',
//     'sitemap'
//   ];

//   return (
//     <div className="icon-gallery">
//       <h2>Icon Gallery</h2>
//       <div className="icon-grid">
//         {iconNames.map((iconName) => (
//           <div key={iconName} className="icon-item">
//             <Icon name={iconName} size="large" mode="light" />
//             <span className="icon-name">{iconName}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
