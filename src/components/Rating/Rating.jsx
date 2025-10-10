import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Rating.css';
import { AlertBanner } from '../AlertBanner/AlertBanner';

/**
 * Rating component for user feedback - renders raw HTML for AlpineJS usage
 */
export const Rating = ({ 
  initialRating = 0,
  numberOfStars = 5,
  enableHalfStar = true,
  readonly = false,
  entityId = null,
  entityType = null,
  averageRating = 0,
  totalVotes = 0,
  showValues = false,
  showAverageTotal = true,
  ratingMode = 'default', // 'default', 'vote', 'self'
  onRatingChange,
  ...props 
}) => {
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hoveredHalf, setHoveredHalf] = useState(false);


  const handleStarClick = (rating, isHalf = false) => {
    if (readonly || ratingMode === 'vote') return; // Prevent clicking in vote mode
    
    const finalRating = isHalf ? rating - 0.5 : rating;
    setCurrentRating(finalRating);
    
    if (onRatingChange) {
      onRatingChange(finalRating);
    }
  };

  const handleStarHover = (rating, isHalf = false) => {
    if (readonly) return;
    setHoveredRating(rating);
    setHoveredHalf(isHalf);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoveredRating(0);
    setHoveredHalf(false);
  };

  const getStarImage = (starIndex) => {
    let rating = currentRating || averageRating;
    
    // Use hovered rating if hovering
    if (hoveredRating > 0) {
      rating = hoveredHalf ? hoveredRating - 0.5 : hoveredRating;
    }
    
    // Different image sets based on rating mode
    if (ratingMode === 'self') {
      // Self-rating mode uses self images
      if (enableHalfStar && rating >= starIndex - 0.5 && rating < starIndex) {
        return '/star-self-half.png';
      } else if (rating >= starIndex) {
        return '/star-self-on.png';
      } else {
        return '/star-off.png';
      }
    } else {
      // Default and vote modes use regular images
      if (enableHalfStar && rating >= starIndex - 0.5 && rating < starIndex) {
        return '/star-half.png';
      } else if (rating >= starIndex) {
        return '/star-on.png';
      } else {
        return '/star-off.png';
      }
    }
  };

  const generateRawHTML = () => {
    let starsHTML = '';
    
    for (let i = 1; i <= numberOfStars; i++) {
      const starImage = getStarImage(i);
      starsHTML += `<img alt="${i}" src="${starImage}" title="${i}">`;
      if (i < numberOfStars) {
        starsHTML += '&nbsp;';
      }
    }

    let valuesHTML = '';
    if (showValues) {
      valuesHTML = `
        <div class="axero-rating-control-values">
          <div class="axero-rating-control-values-sum">${currentRating || averageRating}</div>
          <div class="axero-rating-control-values-total">
            &nbsp;/${numberOfStars}
          </div>
        </div>`;
    }

    let averageTotalHTML = '';
    if (showAverageTotal) {
      averageTotalHTML = `
        <div class="axero-rating-control-average-total">
          <span class="axero-rating-average">${averageRating}</span>
          &nbsp;(<span class="axero-rating-total">${totalVotes}</span> votes)
        </div>`;
    }

    return `
      <div class="axero-rating-control-container">
        <div class="axero-rating-control-images"
             data-readonly="${readonly}" 
             data-loggedinuserratingid="0" 
             data-initialrating="${initialRating}" 
             data-numberofstars="${numberOfStars}" 
             data-enablehalfstar="${enableHalfStar}" 
             data-staronimagename="" 
             data-staroffimagename="" 
             data-starhalfimagename="" 
             data-ratingimagescssclass="axero-rating-control-star" 
             data-entityid="${entityId || ''}" 
             data-entitytype="${entityType || ''}" 
             style="cursor: ${readonly ? 'default' : 'pointer'};">
          ${starsHTML}
          <input name="score" type="hidden" value="${currentRating}">
        </div>
        ${valuesHTML}
        ${averageTotalHTML}
      </div>
    `;
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= numberOfStars; i++) {
      const starImage = getStarImage(i);
      
      stars.push(
        <React.Fragment key={i}>
          <img
            alt={i.toString()}
            src={starImage}
            title={i.toString()}
            onClick={(e) => {
              if (enableHalfStar) {
                const rect = e.target.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const isLeftHalf = clickX < rect.width / 2;
                handleStarClick(i, isLeftHalf);
              } else {
                handleStarClick(i);
              }
            }}
            onMouseMove={(e) => {
              if (enableHalfStar) {
                const rect = e.target.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const isLeftHalf = mouseX < rect.width / 2;
                handleStarHover(i, isLeftHalf);
              } else {
                handleStarHover(i);
              }
            }}
            style={{ cursor: readonly || ratingMode === 'vote' ? 'default' : 'pointer' }}
          />
          {i < numberOfStars && '\u00A0'}
        </React.Fragment>
      );
    }
    
    return stars;
  };

  // For Storybook display, show the interactive React version
  // The raw HTML is available via generateRawHTML() method
  return (
    <div className="axero-rating-control-container" {...props}>
      <div 
        className="axero-rating-control-images"
        data-readonly={readonly.toString()}
        data-loggedinuserratingid="0"
        data-initialrating={initialRating.toString()}
        data-numberofstars={numberOfStars.toString()}
        data-enablehalfstar={enableHalfStar.toString()}
        data-staronimagename=""
        data-staroffimagename=""
        data-starhalfimagename=""
        data-ratingimagescssclass="axero-rating-control-star"
        data-entityid={entityId?.toString() || ""}
        data-entitytype={entityType?.toString() || ""}
        style={{ cursor: readonly || ratingMode === 'vote' ? 'default' : 'pointer' }}
        onMouseLeave={handleMouseLeave}
      >
        {renderStars()}
        <input name="score" type="hidden" value={currentRating} />
      </div>
      
      {showValues && (
        <div className="axero-rating-control-values">
          <div className="axero-rating-control-values-sum">{currentRating || averageRating}</div>
          <div className="axero-rating-control-values-total">
            &nbsp;/{numberOfStars}
          </div>
        </div>
      )}
      
      {showAverageTotal && (
        <div className="axero-rating-control-average-total">
          <span className="axero-rating-average">{averageRating}</span>
          &nbsp;(<span className="axero-rating-total">{totalVotes}</span> votes)
        </div>
      )}

    </div>
  );
};

// Add method to generate raw HTML for AlpineJS usage
Rating.generateHTML = (options = {}) => {
  const {
    initialRating = 0,
    numberOfStars = 5,
    enableHalfStar = true,
    readonly = false,
    entityId = null,
    entityType = null,
    averageRating = 0,
    totalVotes = 0,
    showValues = false,
    showAverageTotal = true
  } = options;

  let starsHTML = '';
  
  for (let i = 1; i <= numberOfStars; i++) {
    let starImage = '/star-off.png';
    const rating = initialRating || averageRating;
    
    if (enableHalfStar && rating >= i - 0.5 && rating < i) {
      starImage = '/star-half.png';
    } else if (rating >= i) {
      starImage = '/star-on.png';
    }
    
    starsHTML += `<img alt="${i}" src="${starImage}" title="${i}">`;
    if (i < numberOfStars) {
      starsHTML += '&nbsp;';
    }
  }

  let valuesHTML = '';
  if (showValues) {
    valuesHTML = `
      <div class="axero-rating-control-values">
        <div class="axero-rating-control-values-sum">${initialRating || averageRating}</div>
        <div class="axero-rating-control-values-total">
          &nbsp;/${numberOfStars}
        </div>
      </div>`;
  }

  let averageTotalHTML = '';
  if (showAverageTotal) {
    averageTotalHTML = `
      <div class="axero-rating-control-average-total">
        <span class="axero-rating-average">${averageRating}</span>
        &nbsp;(<span class="axero-rating-total">${totalVotes}</span> votes)
      </div>`;
  }

  return `<div class="axero-rating-control-container">
    <div class="axero-rating-control-images" 
         data-readonly="${readonly}" 
         data-loggedinuserratingid="0" 
         data-initialrating="${initialRating}" 
         data-numberofstars="${numberOfStars}" 
         data-enablehalfstar="${enableHalfStar}" 
         data-staronimagename="" 
         data-staroffimagename="" 
         data-starhalfimagename="" 
         data-ratingimagescssclass="axero-rating-control-star" 
         data-entityid="${entityId || ''}" 
         data-entitytype="${entityType || ''}" 
         style="cursor: ${readonly ? 'default' : 'pointer'};">
      ${starsHTML}
      <input name="score" type="hidden" value="${initialRating}">
    </div>
    ${valuesHTML}
    ${averageTotalHTML}
  </div>`;
};

Rating.propTypes = {
  /**
   * Initial rating value
   */
  initialRating: PropTypes.number,
  /**
   * Number of stars to display
   */
  numberOfStars: PropTypes.number,
  /**
   * Enable half-star ratings
   */
  enableHalfStar: PropTypes.bool,
  /**
   * Make the rating read-only
   */
  readonly: PropTypes.bool,
  /**
   * Entity ID for backend integration
   */
  entityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Entity type for backend integration
   */
  entityType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Average rating to display
   */
  averageRating: PropTypes.number,
  /**
   * Total number of votes
   */
  totalVotes: PropTypes.number,
  /**
   * Show the rating values (current/total)
   */
  showValues: PropTypes.bool,
  /**
   * Show average rating and total votes
   */
  showAverageTotal: PropTypes.bool,
  /**
   * Rating mode: 'default', 'vote' (hover only), 'self' (uses self images)
   */
  ratingMode: PropTypes.oneOf(['default', 'vote', 'self']),
  /**
   * Callback when rating changes
   */
  onRatingChange: PropTypes.func,
};
