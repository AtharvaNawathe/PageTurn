/**
 * Utility function to validate email addresses.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  module.exports = {
    isValidEmail,
  };
  