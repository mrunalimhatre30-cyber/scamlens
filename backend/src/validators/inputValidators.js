/**
 * ScamLens Input Validators
 * Server-side validation and sanitization
 */

export function validateRegistration(data) {
  const errors = [];
  const { name, email, password, confirmPassword } = data || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters.');
  } else if (name.trim().length > 100) {
    errors.push('Full name cannot exceed 100 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('Please provide a valid email address.');
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  } else if (!/(?=.*[0-9]|.*[!@#$%^&*])/.test(password)) {
    errors.push('Password must contain at least one number or special character.');
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.push('Passwords do not match.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name: name ? name.trim() : '',
      email: email ? email.trim().toLowerCase() : '',
      password
    }
  };
}

export function validateLogin(data) {
  const errors = [];
  const { email, password } = data || {};

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email is required.');
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push('Password is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      email: email ? email.trim().toLowerCase() : '',
      password
    }
  };
}

export function validateMessageInput(data) {
  const errors = [];
  const { message } = data || {};

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.push('Message text is required for analysis.');
  } else if (message.length > 5000) {
    errors.push('Message exceeds the maximum limit of 5,000 characters.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedText: message ? message.trim() : ''
  };
}

export function validateUrlInput(data) {
  const errors = [];
  const { url } = data || {};

  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    errors.push('URL is required for analysis.');
  } else if (url.length > 2048) {
    errors.push('URL exceeds maximum supported length.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedUrl: url ? url.trim() : ''
  };
}
