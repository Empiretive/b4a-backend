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
    let userFormat;
    if (!isEmpty(user)) {
      userFormat = {
        dni: user.dni,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        image: user.photo,
        token: user.token,
      };
    }
    res
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
    res
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
    res
      .json(
        Response(null, "Logout success", "Logout error", !isEmpty(userLogout))
      )
      .status(200);
  } catch (error) {
    res.json(Response(error, null, "Logout error", false)).status(200);
  }
};

export const getUserByToken = async (req, res) => {
  try {
    const user = await UserDao.findUser({
      token: req.body.token,
    });
    if (isEmpty(user)) {
      res
        .json(Response(null, null, "USER.FIND.ERROR.NOT_FOUND", false))
        .status(400);
    }
    const payload = await getPayload(user.token);
    if (!isEmpty(payload.error)) {
      await userDao.savedToken(user._id, null);
      res
        .json(Response(null, null, "USER.FIND.TOKEN_EXPIRED", false))
        .status(400);
    }
    const userFormat = await userFormater(user);
    res
      .json(
        Response(
          userFormat,
          "USER.FIND.SUCCESS",
          "USER.FIND.ERROR.NOT_FOUND",
          !isEmpty(userFormat)
        )
      )
      .status(200);
  } catch (error) {
    res
      .json(
        Response(
          null,
          "USER.FIND.SUCCESS",
          "USER.FIND.ERROR.BAD_REQUEST",
          false
        )
      )
      .status(400);
  }
};

// export const profile = (req, res) => {
//   try {
//   } catch (error) {}
// };
