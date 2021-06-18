import { isEmpty } from "lodash";
import { Response } from "../../common/response";
import { generateToken, getPayload } from "../../utils/jwt";
import { comparePassword } from "../../utils/passwordCrypt";
import * as UserDao from "../user/data_objects/user.dao";
import { userFormater } from "../user/data_objects/user.formater";
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
        return res
          .json(Response(null, null, "USER.AUTH.ERROR.USER_NOT_EXISTS", false))
          .status(401);
      }
    }

    const compare = await comparePassword(
      req.body.password,
      userFound.password
    );

    if (!compare) {
      return res
        .json(Response(null, null, "USER.AUTH.ERROR.BAD_PASSWORD", false))
        .status(401);
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
    let userFormat;
    if (!isEmpty(user)) {
      userFormat = await userFormater(user);
    }
    userFormat.token = token;
    return res
      .json(
        Response(
          { user: userFormat },
          "USER.AUTH.SUCCESS",
          "USER.AUTH.ERROR",
          !isEmpty(userFormat)
        )
      )
      .status(!isEmpty(userFormat) ? 200 : 401);
  } catch (error) {
    return res
      .json(Response(error, null, "USER.AUTH.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

export const logout = async (req, res) => {
  try {
    const user = await UserDao.findUser({
      _id: req.user._id,
    });
    const userLogout = await UserDao.savedToken(user._id, null);
    return res
      .json(
        Response(
          null,
          "USER.AUTH.SUCCESS.LOGOUT",
          "USER.AUTH.ERROR.LOGOUT",
          !isEmpty(userLogout)
        )
      )
      .status(200);
  } catch (error) {
    return res
      .json(Response(error, null, "USER.AUTH.ERROR.LOGOUT", false))
      .status(200);
  }
};

export const getUserByToken = async (req, res) => {
  try {
    if (isEmpty(req.body.token)) {
      return res
        .json(Response(null, null, "USER.AUTH.ERROR.TOKEN_NOT_PROVIDED", false))
        .status(400);
    }
    const user = await UserDao.findUser({
      token: req.body.token,
    });
    if (isEmpty(user)) {
      return res
        .json(Response(null, null, "USER.AUTH.ERROR.NOT_FOUND", false))
        .status(400);
    }
    let userFormat = await userFormater(user);

    const payload = await getPayload(user.token);
    if (!isEmpty(payload.error)) {
      await userDao.savedToken(user._id, null);
      return res
        .json(Response(null, null, "USER.AUTH.ERROR.TOKEN_EXPIRED", false))
        .status(400);
    }
    userFormat.token = user.token;
    return res
      .json(
        Response(
          userFormat,
          "USER.AUTH.SUCCESS",
          "USER.AUTH.ERROR.NOT_VALID",
          !isEmpty(userFormat)
        )
      )
      .status(200);
  } catch (error) {
    return res
      .json(
        Response(
          error,
          "USER.AUTH.SUCCESS",
          "USER.AUTH.ERROR.BAD_REQUEST",
          false
        )
      )
      .status(400);
  }
};

export const profile = async (req, res) => {
  try {
    const user = await UserDao.findUser({
      _id: req.user._id,
    });
    const userFormat = await userFormater(user);
    return res
      .json(
        Response(
          userFormat,
          "USER.AUTH.PROFILE.SUCCESS",
          "USER.AUTH.PROFILE.ERROR.NOT_FOUND",
          !isEmpty(userFormat)
        )
      )
      .status(400);
  } catch (error) {
    return res
      .json(Response(error, null, "USER.AUTH.PROFILE.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};
