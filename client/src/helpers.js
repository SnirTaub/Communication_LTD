import * as Config from "../src/config.json";


const passwordConfig = Config.default;

const containsCaptial = (data) => {
  return /[A-Z]/.test(data);
};

export const isValidEmail = (data) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
}

const containsDigits = (data) => {
  return /[0-9]/.test(data);
};

const containsSpecialChars = (data) => {
  return /[\W_]/.test(data);
};

const isCommonPassword = (data) => {
  return passwordConfig.commonPasswords.includes(data);
};

export const validateByConfig = (formData) => {

  if (formData.email && !isValidEmail(formData.email)) {
    return {isValid : false, errorMsg : `email is not in correct format`};
  }

  if (passwordConfig.passwordLength > formData.password) {
    return {isValid : false, errorMsg : `password must be at least ${passwordConfig.passwordLength} characters long!`};
  }

  if (passwordConfig.mustContain.capitals) {
    if (!containsCaptial(formData.password)) {
      return {isValid : false, errorMsg : `password must contain at least one capital letter!`};
    }
  }

  if (passwordConfig.mustContain.digits) {
    if (!containsDigits(formData.password)) {
      return {isValid : false, errorMsg : `password must contain at least one digit!`};
    }
  }

  if (passwordConfig.mustContain.specialChars) {
    if (!containsSpecialChars(formData.password)) {
      return {isValid : false, errorMsg : `password must contain at least one special character!`};
    }
  }

  if (passwordConfig.mustContain.disallowCommonPassword) {
    if (isCommonPassword(formData.password)) {
      return {isValid : false, errorMsg : `password is too common, please use something else!`};
    }
  }

  if (formData.password !== formData.repeatPassword) {
    return {isValid : false, errorMsg : `password and repeat password don't match!`};
  }

  return {isValid : true, errorMsg : ``};
};


