import React from 'react';
import PropTypes from 'prop-types';
import './Tags.css';

/**
 * Tags component - Displays a collection of tags with optional edit mode
 */
export const Tags = ({
  tags = [],
  editMode = false,
  onRemove,
  variant = 'label', // 'label' or 'badge'
  className = '',
  ...props
}) => {
  const handleRemove = (tagIndex, tagValue) => {
    if (onRemove && editMode) {
      onRemove(tagIndex, tagValue);
    }
  };

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`tags-cp-container ${editMode ? 'edit-mode' : ''} ${className}`} {...props}>
      {tags.map((tag, index) => (
        <span key={index} className={`tag-cp ${variant}`}>
          <span className="tag-cp-text">{tag}</span>
          {editMode && (
            <span
              title='Remove tag'
              className="tag-cp-remove"
              onClick={() => handleRemove(index, tag)}
              aria-label={`Remove ${tag} tag`}
            >
                <i className="fas fa-times"></i>
            </span>
          )}
        </span>
      ))}
      
    </div>
  );
};

Tags.propTypes = {
  /**
   * Array of tag strings to display
   */
  tags: PropTypes.arrayOf(PropTypes.string),
  /**
   * Whether to show remove buttons on tags
   */
  editMode: PropTypes.bool,
  /**
   * Visual variant of the tags
   */
  variant: PropTypes.oneOf(['label', 'badge']),
  /**
   * Callback when a tag is removed (tagIndex, tagValue)
   */
  onRemove: PropTypes.func,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};