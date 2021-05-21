import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = async (payload) => {
  const token = await jwt.sign(payload, config.JWT.SECRET, {
    expiresIn: config.JWT.EXPIRE_IN,
  });
  return token;
};

export const getPayload = (token) => {
  const payload = jwt.verify(token, config.JWT.SECRET);
  return payload;
};
