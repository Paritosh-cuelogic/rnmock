import {EMAIL_REGEX} from '../common/constants/regexConstants';

/**
 *
 * @param {string} key -> form filed
 * @param {string} value -> input value
 * @param {object} rules -> rules onject
 * @returns {any} error message or null
 */
const validate = (key, value, rules) => {
  // check for required validation
  if (rules.isRequired && value.trim() === '') {
    return `${key} should not be empty`;
  }

  // check valida email
  if (rules.isEmail && !EMAIL_REGEX.test(value)) {
    return 'Invalid email';
  }

  // check for max length
  if (rules.maxLength && value.trim().lenght < rules.maxLength) {
    return `${key} should not be more than ${rules.maxLength} character long`;
  }

  // check for min length
  if (rules.minLength && value.trim().lenght > rules.minLength) {
    return `${key} should be atlist ${rules.minLength} character long`;
  }
  return null;
};

export default validate;
