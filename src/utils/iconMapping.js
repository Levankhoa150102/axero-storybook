/**
 * FontAwesome 5 Icon Mapping Utility
 * Maps semantic icon names to FontAwesome CSS classes
 */

// Icon name mapping for FontAwesome 5 classes
export const iconClassMap = {
  // Navigation & UI
  home: 'fa-home',
  user: 'fa-user',
  settings: 'fa-cog',
  search: 'fa-search',
  menu: 'fa-bars',
  close: 'fa-times',
  x: 'fa-times',
  
  // Actions
  edit: 'fa-edit',
  trash: 'fa-trash',
  delete: 'fa-trash',
  check: 'fa-check',
  plus: 'fa-plus',
  minus: 'fa-minus',
  download: 'fa-download',
  upload: 'fa-upload',
  
  // Communication
  mail: 'fa-envelope',
  phone: 'fa-phone',
  
  // Media & Content
  heart: 'fa-heart',
  star: 'fa-star',
  eye: 'fa-eye',
  'eye-off': 'fa-eye-slash',
  
  // Time & Calendar
  calendar: 'fa-calendar',
  
  // Security
  lock: 'fa-lock',
  unlock: 'fa-unlock',
  
  // Arrows & Navigation
  'arrow-left': 'fa-arrow-left',
  'arrow-right': 'fa-arrow-right',
  'arrow-up': 'fa-arrow-up',
  'arrow-down': 'fa-arrow-down',
  'caret-right': 'fa-caret-right',
  'caret-left': 'fa-caret-left',
  'caret-up': 'fa-caret-up',
  'caret-down': 'fa-caret-down',
  'chevron-right': 'fa-chevron-right',
  'chevron-left': 'fa-chevron-left',
  'chevron-up': 'fa-chevron-up',
  'chevron-down': 'fa-chevron-down',
  
  // Status & Feedback
  info: 'fa-info-circle',
  warning: 'fa-exclamation-triangle',
  error: 'fa-exclamation-circle',
  success: 'fa-check-circle',
  
  // Additional icons
  sitemap: 'fa-sitemap',
};

/**
 * Get FontAwesome CSS class for an icon name
 * @param {string} iconName - The semantic icon name
 * @returns {string} FontAwesome CSS class
 */
export const getIconClass = (iconName) => {
  return iconClassMap[iconName] || iconClassMap.home;
};

/**
 * Generate complete FontAwesome CSS classes for an icon
 * @param {string} iconName - The semantic icon name
 * @param {string} size - Size variant (small, medium, large)
 * @param {string} mode - Mode/theme (light, dark)
 * @returns {string} Complete CSS class string
 */
export const getIconClasses = (iconName, size = 'medium', mode = 'light') => {
  const baseClass = 'fas';
  const iconClass = getIconClass(iconName);
  const sizeClass = `icon--${size}`;
  const modeClass = `icon--${mode}`;
  
  return `${baseClass} ${iconClass} icon ${sizeClass} ${modeClass}`;
};

/**
 * Get all available icon names
 * @returns {string[]} Array of available icon names
 */
export const getAvailableIcons = () => {
  return Object.keys(iconClassMap);
};
