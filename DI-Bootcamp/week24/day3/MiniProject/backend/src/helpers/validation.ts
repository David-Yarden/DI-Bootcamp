export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (!password || password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  return { valid: true };
};

export const validateUsername = (username: string): { valid: boolean; message?: string } => {
  if (!username || username.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters long' };
  }
  if (username.length > 50) {
    return { valid: false, message: 'Username must be less than 50 characters' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }
  return { valid: true };
};

export const sanitizeInput = (input: string): string => {
  // Basic sanitization - remove potential SQL injection characters
  return input.trim().replace(/[<>'"]/g, '');
};

export const validateStoryTitle = (title: string): { valid: boolean; message?: string } => {
  if (!title || title.trim().length === 0) {
    return { valid: false, message: 'Title is required' };
  }
  if (title.length > 255) {
    return { valid: false, message: 'Title must be less than 255 characters' };
  }
  return { valid: true };
};

export const validateStoryContent = (content: string): { valid: boolean; message?: string } => {
  if (!content || content.trim().length === 0) {
    return { valid: false, message: 'Content is required' };
  }
  return { valid: true };
};
