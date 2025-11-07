/**
 * Valide un email
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valide un mot de passe
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
    };
  }

  const criteria = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
  };

  const validCriteriaCount = Object.values(criteria).filter(Boolean).length;
  criteria.isValid = validCriteriaCount >= 3 && criteria.minLength;

  return criteria;
};

/**
 * Valide que les mots de passe correspondent
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword && password.length > 0;
};

/**
 * Nettoie un email
 */
export const sanitizeEmail = (email) => {
  if (!email) return '';
  return email.trim().toLowerCase();
};

/**
 * Messages d'erreur
 */
export const errorMessages = {
  email: {
    required: "L'email est requis",
    invalid: 'Veuillez entrer un email valide',
  },
  password: {
    required: 'Le mot de passe est requis',
    tooShort: 'Le mot de passe doit contenir au moins 8 caractères',
    weak: 'Le mot de passe est trop faible',
    mismatch: 'Les mots de passe ne correspondent pas',
  },
  name: {
    required: 'Le nom est requis',
  },
};

/**
 * Valide un formulaire de connexion
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  const cleanEmail = sanitizeEmail(formData.email);
  if (!cleanEmail) {
    errors.email = errorMessages.email.required;
  } else if (!validateEmail(cleanEmail)) {
    errors.email = errorMessages.email.invalid;
  }

  if (!formData.password) {
    errors.password = errorMessages.password.required;
  }

  return errors;
};

/**
 * Valide un formulaire d'inscription
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};

  if (!formData.nom) {
    errors.nom = errorMessages.name.required;
  }

  const cleanEmail = sanitizeEmail(formData.email);
  if (!cleanEmail) {
    errors.email = errorMessages.email.required;
  } else if (!validateEmail(cleanEmail)) {
    errors.email = errorMessages.email.invalid;
  }

  if (!formData.password) {
    errors.password = errorMessages.password.required;
  } else {
    const passwordCheck = validatePassword(formData.password);
    if (!passwordCheck.isValid) {
      errors.password = errorMessages.password.weak;
    }
  }

  if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = errorMessages.password.mismatch;
  }

  return errors;
};

export default {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  sanitizeEmail,
  errorMessages,
  validateLoginForm,
  validateRegistrationForm,
};