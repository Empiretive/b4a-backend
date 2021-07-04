import { isEmpty, isString } from "lodash";
import { emailRegExp, phoneRegExp } from "../../../utils/regExps";
export const userDto = ({ dni, name, lastName, email, role, photo }) => {
  let error = [];

  if (isEmpty(dni) || !isString(dni) || dni.length > 9 || dni.length < 7) {
    error.push("USER.REGISTER.ERROR.DNI");
  }
  if (isEmpty(name) || !isString(name)) {
    error.push("USER.REGISTER.ERROR.NAME");
  }
  if (isEmpty(lastName) || !isString(lastName)) {
    error.push("USER.REGISTER.ERROR.LAST_NAME");
  }

  if (isEmpty(email) || !emailRegExp.test(email)) {
    error.push("USER.REGISTER.ERROR.EMAIL");
  }

  if (error.length > 0) {
    return { error };
  } else {
    return { dni, name, lastName, email, role, photo };
  }
};
