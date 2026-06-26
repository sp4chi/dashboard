const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate the user form fields.
 * Returns an object of { fieldName: errorMessage }.
 * An empty object means the form is valid.
 */
export const validateUser = ({ firstName, lastName, email, department }) => {
  const errors = {};

  if (!firstName.trim()) errors.firstName = 'First name is required.';
  if (!lastName.trim()) errors.lastName = 'Last name is required.';

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!department) errors.department = 'Select a department.';

  return errors;
};
