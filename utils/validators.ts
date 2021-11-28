/* eslint-disable no-useless-escape */
export const urlValidator = {
  validator: (val: any, allowNull = true) => {
    if (allowNull && val === null) {
      return true;
    } else if (val == null) {
      return false;
    }
    const urlRegex =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
  },
  message: (props: any) => `${props.value} is not a valid url.`,
};

export const emailValidator = {
  validator: (val: any) => {
    const urlRegex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return urlRegex.test(val);
  },
  message: (props: any) => `${props.value} is not a valid email.`,
};

export const phoneNumberValidator = {
  validator: (val: any) => {
    const urlRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return urlRegex.test(val);
  },
  message: (props: any) => `${props.value} is not a valid phone number.`,
};

export const requiredValidator = {
  validator: (val: any) => {
    if (val == null || val === "") {
      return false;
    }
  },
  message: (props: any) => `${props.value} is required.`,
};

export const decimalValidator = {
  validator: (val: any) => {
    const decimals = "*";
    const separator = ".";

    if (val === null || val === undefined || val === "") {
      return false;
    }
    if (Number(decimals) === 0) {
      return /^-?\d*$/.test(val);
    }
    const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    );

    return regex.test(val);
  },
  message: (props: any) => `${props.value} is no decimal number (e.g. 1.2).`,
};

export const minValidator = {
  validator: (val: any, min = 1) => {
    if (val != null && val >= min) {
      return true;
    }

    return false;
  },
  message: (props: any) => `${props.value} is too small.`,
};

export const maxValidator = {
  validator: (val: any, max = 24) => {
    if (val != null && val <= max) {
      return true;
    }

    return false;
  },
  message: (props: any) => `${props.value} is too large.`,
};

export const minLengthValidator = {
  validator: (val: any, min = 6) => {
    if (val != null && val.toString().length >= min) {
      return true;
    }

    return false;
  },
  message: (props: any) => `${props.value} is too short.`,
};

export const checkboxValidator = {
  validator: (val: any) => {
    if (val === true) {
      return true;
    }

    return false;
  },
  message: (props: any) => `${props.value} must be checked.`,
};

export function validateAll(
  val: any,
  rules: Array<{ [key: string]: any }>,
  fieldName?: string
) {
  const errorMessages = [] as string[];

  for (const rule of rules) {
    const fn = fieldName == null ? "Feld" : fieldName;
    const ruleNames = Object.keys(rule);
    const ruleName = ruleNames.length > 0 ? ruleNames[0] : "";

    if (ruleName === "url") {
      const prop = rule[ruleName];
      const valResult = urlValidator.validator(val, prop);
      if (valResult === false) {
        const errorMessage = urlValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    } else if (ruleName === "email") {
      const valResult = emailValidator.validator(val);
      if (valResult === false) {
        const errorMessage = emailValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    } else if (ruleName === "phoneNumber") {
      const valResult = phoneNumberValidator.validator(val);
      if (valResult === false) {
        const errorMessage = phoneNumberValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    } else if (ruleName === "required") {
      const valResult = requiredValidator.validator(val);
      if (valResult === false) {
        const errorMessage = requiredValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    } else if (ruleName === "decimal") {
      const valResult = decimalValidator.validator(val);
      if (valResult === false) {
        const errorMessage = decimalValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    } else if (ruleName === "min_value") {
      const prop = rule[ruleName];
      const valResult = minValidator.validator(val, prop);
      if (valResult === false) {
        const errorMessage = minValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    } else if (ruleName === "max_value") {
      const prop = rule[ruleName];
      const valResult = maxValidator.validator(val, prop);
      if (valResult === false) {
        const errorMessage = maxValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    } else if (ruleName === "min_length") {
      const prop = rule[ruleName];
      const valResult = minLengthValidator.validator(val, prop);
      if (valResult === false) {
        const errorMessage = minLengthValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    } else if (ruleName === "checkbox") {
      const valResult = checkboxValidator.validator(val);
      if (valResult === false) {
        const errorMessage = checkboxValidator.message({ value: fn });
        errorMessages.push(errorMessage);
      }
    }
  }

  return errorMessages;
}
