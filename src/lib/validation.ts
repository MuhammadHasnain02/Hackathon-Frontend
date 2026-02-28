/**
 * Client-side form validation helpers.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) {
    return { valid: false, message: "Email is required" };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, message: "Please enter a valid email address" };
  }
  return { valid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, message: "Password is required" };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      valid: false,
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    };
  }
  return { valid: true };
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): ValidationResult {
  const pwdResult = validatePassword(password);
  if (!pwdResult.valid) return pwdResult;
  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match" };
  }
  return { valid: true };
}
