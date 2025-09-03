/**
 * Utility functions for input validation
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { 
      isValid: false, 
      message: 'Password is required' 
    };
  }
  
  if (password.length < 8) {
    return { 
      isValid: false, 
      message: 'Password must be at least 8 characters' 
    };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one uppercase letter' 
    };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one lowercase letter' 
    };
  }
  
  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one number' 
    };
  }
  
  return { 
    isValid: true, 
    message: 'Password is strong' 
  };
};

/**
 * Validate username format
 * @param {string} username - Username to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateUsername = (username) => {
  if (!username) {
    return { 
      isValid: false, 
      message: 'Username is required' 
    };
  }
  
  if (username.length < 3) {
    return { 
      isValid: false, 
      message: 'Username must be at least 3 characters' 
    };
  }
  
  if (username.length > 30) {
    return { 
      isValid: false, 
      message: 'Username must be less than 30 characters' 
    };
  }
  
  // Check for valid characters (letters, numbers, underscores)
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { 
      isValid: false, 
      message: 'Username can only contain letters, numbers, and underscores' 
    };
  }
  
  return { 
    isValid: true, 
    message: 'Username is valid' 
  };
};

/**
 * Validate community name
 * @param {string} name - Community name to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateCommunityName = (name) => {
  if (!name) {
    return { 
      isValid: false, 
      message: 'Community name is required' 
    };
  }
  
  if (name.length < 3) {
    return { 
      isValid: false, 
      message: 'Community name must be at least 3 characters' 
    };
  }
  
  if (name.length > 50) {
    return { 
      isValid: false, 
      message: 'Community name must be less than 50 characters' 
    };
  }
  
  return { 
    isValid: true, 
    message: 'Community name is valid' 
  };
};

/**
 * Validate post title
 * @param {string} title - Post title to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePostTitle = (title) => {
  if (!title) {
    return { 
      isValid: false, 
      message: 'Post title is required' 
    };
  }
  
  if (title.length < 5) {
    return { 
      isValid: false, 
      message: 'Post title must be at least 5 characters' 
    };
  }
  
  if (title.length > 100) {
    return { 
      isValid: false, 
      message: 'Post title must be less than 100 characters' 
    };
  }
  
  return { 
    isValid: true, 
    message: 'Post title is valid' 
  };
};

/**
 * Validate post content
 * @param {string} content - Post content to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePostContent = (content) => {
  if (!content) {
    return { 
      isValid: false, 
      message: 'Post content is required' 
    };
  }
  
  if (content.length < 10) {
    return { 
      isValid: false, 
      message: 'Post content must be at least 10 characters' 
    };
  }
  
  if (content.length > 5000) {
    return { 
      isValid: false, 
      message: 'Post content must be less than 5000 characters' 
    };
  }
  
  return { 
    isValid: true, 
    message: 'Post content is valid' 
  };
};

/**
 * Validate comment content
 * @param {string} content - Comment content to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateCommentContent = (content) => {
  if (!content) {
    return { 
      isValid: false, 
      message: 'Comment content is required' 
    };
  }
  
  if (content.length < 2) {
    return { 
      isValid: false, 
      message: 'Comment content must be at least 2 characters' 
    };
  }
  
  if (content.length > 1000) {
    return { 
      isValid: false, 
      message: 'Comment content must be less than 1000 characters' 
    };
  }
  
  return { 
    isValid: true, 
    message: 'Comment content is valid' 
  };
};

/**
 * Validate payment amount
 * @param {number} amount - Payment amount in cents
 * @returns {Object} Validation result with isValid and message
 */
export const validatePaymentAmount = (amount) => {
  if (amount === undefined || amount === null) {
    return { 
      isValid: false, 
      message: 'Payment amount is required' 
    };
  }
  
  if (isNaN(amount) || amount <= 0) {
    return { 
      isValid: false, 
      message: 'Payment amount must be a positive number' 
    };
  }
  
  return { 
    isValid: true, 
    message: 'Payment amount is valid' 
  };
};

