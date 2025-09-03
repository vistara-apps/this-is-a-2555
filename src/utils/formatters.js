/**
 * Utility functions for formatting data
 */

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted relative time
 */
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (isNaN(diffInSeconds)) {
    return 'Invalid date';
  }
  
  // Define time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  // Find the appropriate interval
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    
    if (interval >= 1) {
      return interval === 1 
        ? `1 ${unit} ago` 
        : `${interval} ${unit}s ago`;
    }
  }
  
  return 'Just now';
};

/**
 * Format number with K/M/B suffix for large numbers
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }
  
  if (num < 1000) {
    return num.toString();
  }
  
  const units = ['', 'K', 'M', 'B', 'T'];
  const order = Math.floor(Math.log10(num) / 3);
  
  const unitValue = num / Math.pow(1000, order);
  const formattedValue = unitValue.toFixed(1).replace(/\.0$/, '');
  
  return `${formattedValue}${units[order]}`;
};

/**
 * Format currency amount
 * @param {number} amount - Amount in cents
 * @param {string} currency - Currency code (default: 'usd')
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, currency = 'usd') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }
  
  // Convert cents to dollars
  const dollars = amount / 100;
  
  // Format based on currency
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  });
  
  return formatter.format(dollars);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format username for display
 * @param {string} username - Raw username
 * @returns {string} Formatted username
 */
export const formatUsername = (username) => {
  if (!username) return '';
  
  // Add @ symbol if not present
  if (!username.startsWith('@')) {
    return `@${username}`;
  }
  
  return username;
};

/**
 * Extract hashtags from text
 * @param {string} text - Text to extract hashtags from
 * @returns {string[]} Array of hashtags
 */
export const extractHashtags = (text) => {
  if (!text) return [];
  
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const matches = text.match(hashtagRegex);
  
  return matches ? matches : [];
};

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

