import { isEmpty } from "lodash";
import { Response } from "../../common/response";
import { generateToken, getPayload } from "../../utils/jwt";
import { comparePassword } from "../../utils/passwordCrypt";
import * as UserDao from "../user/data_objects/user.dao";

export const signIn = async (req, res) => {
  try {
    let userFound = await UserDao.findUser({
      dni: req.body.userPass,
    });
    if (isEmpty(userFound) || userFound == null) {
      userFound = await UserDao.findUser({
        email: req.body.userPass,
      });
      if (isEmpty(userFound)) {
        res
          .json(Response(null, null, "USER.AUTH.ERROR.USER_NOT_EXISTS", false))
          .status(401);
        return 0;
      }
    }

    const compare = await comparePassword(
      req.body.password,
      userFound.password
    );

    if (!compare) {
      res
        .json(Response(null, null, "USER.AUTH.ERROR.BAD_PASSWORD", false))
        .status(401);
      return 0;
    }
    let token;
    if (!isEmpty(userFound.token)) {
      const payload = await getPayload(userFound.token);
      if (!isEmpty(payload.error)) {
        token = await generateToken({
          user: {
            _id: userFound._id,
            name: userFound.name,
            lastName: userFound.lastName,
            role: userFound.role,
          },
        });
      } else {
        token = userFound.token;
      }
    } else {
      token = await generateToken({
        user: {
          _id: userFound._id,
          name: userFound.name,
          lastName: userFound.lastName,
          role: userFound.role,
        },
      });
    }
    const user = await UserDao.savedToken(userFound._id, token);

    res
      .json(
        Response(
          { user: user },
          "User Authenticated",
          "User Cant Authenticated",
          true
        )
      )
      .status(200);
  } catch (error) {
    res.json(Response(error, null, "Login Error", false)).status(400);
  }
};

export const logout = async (req, res) => {
  try {
    const user = await UserDao.findUser({
      _id: req.user._id,
    });
    const userLogout = await UserDao.savedToken(user._id, null);
    res
      .json(
        Response(null, "Logout success", "Logout error", !isEmpty(userLogout))
      )
      .status(200);
  } catch (error) {
    res.json(Response(error, null, "Logout error", false)).status(200);
  }
};

export const profile = (req, res) => {
  try {
  } catch (error) {}
};
