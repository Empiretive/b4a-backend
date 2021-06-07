import { isEmpty } from "lodash";
import { UserState } from "../States";
import { getPayload } from "../../utils/jwt";
import * as UserDao from "../../api/user/data_objects/user.dao";
export const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role.level <= role) {
      next();
      return 0;
    }
    res.json("You dont have permission to access to this route").status(401);
  };
};

export const JWTAuth = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (isEmpty(bearer)) {
    res.json({ message: "No token provided", success: false }).status(401);
    return 0;
  }
  const token = bearer.split(" ");
  const payload = getPayload(token[1]);
  if (!isEmpty(payload.error)) {
    res.json({ message: "Token invalid", success: false }).status(401);
    return 0;
  }
  const user = await UserDao.findUser({
    token: token[1],
    _id: payload.user._id,
    deletedAt: null,
    status: UserState.active,
  });
  if (isEmpty(user)) {
    res.json({ message: "Token Expired", success: false }).status(401);
    return 0;
  }
  req.user = payload.user;
  next();
};
