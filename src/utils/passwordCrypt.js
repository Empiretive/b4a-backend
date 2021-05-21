import bcrypt from "bcryptjs";
import config from "../config";

// Encrypt a password
export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(config.CRYPT.SALT_ROUND);
  const encryptPass = await bcrypt.hash(password, salt);
  return encryptPass;
};

// Compare two password encrypted
export const comparePassword = async (password, orginPassword) => {
  const compare = await bcrypt.compare(password, orginPassword);
  return compare;
};
