import * as UserDao from "./data_objects/user.dao";
import passwordGenerator from "generate-password";
import * as encrypt from "../../utils/passwordCrypt";
import { userDto } from "./data_objects/user.dto";
import { sendMailRegister } from "../../utils/mail/mail";
import { isEmpty } from "lodash";
import { Response } from "../../common/response";
import * as jwt from "../../utils/jwt";
import { UserState } from "../../common/States";
import { AllUserFormat, userFormater } from "./data_objects/user.formater";
// Register user BACKOFFICE
export const registerUser = async (req, res) => {
  try {
    // Verify user dont exist
    const userFound = await UserDao.findUser({
      dni: req.body.dni,
      deletedAt: null,
      status: UserState.active,
    });
    const userFoundbyEmail = await UserDao.findUser({
      email: req.body.email,
      deletedAt: null,
      status: UserState.active,
    });
    if (isEmpty(userFound) && isEmpty(userFoundbyEmail)) {
      const { dni, name, lastName, phone, email, role, photo } = req.body;
      let password = passwordGenerator.generate({
        length: 10,
        numbers: true,
      }); //Generate a dinamic password to a new user

      // The dto validate the properties
      const user = userDto({
        dni,
        name,
        lastName,
        phone,
        email,
        role,
        photo,
      });
      // Send a mail with the password generate
      await sendMailRegister(user.email, { name, password });

      user.password = await encrypt.encryptPassword(password); //Encrypt Password
      user.status = UserState.active;
      const userSaved = await UserDao.registerUser(user); //Saved user on BD
      const token = null;

      // Generate Token on register?
      // await jwt.generateToken({
      //   user: {
      //     _id: userSaved._id,
      //     name: userSaved.name,
      //     lastName: userSaved.lastName,
      //     role: userSaved.role,
      //   },
      // });
      const userResponse = await UserDao.savedToken(userSaved._id, token);

      res
        .json(
          Response(
            userResponse,
            "USER.REGISTER.SUCCESS",
            "USER.REGISTER.ERROR.CANT_BE_REGISTERED",
            !isEmpty(userResponse)
          )
        )
        .status(!isEmpty(userResponse) ? 201 : 403);
    } else {
      res
        .json(Response(null, null, "USER.REGISTER.ERROR.USER_EXIST", false))
        .status(400);
    }
  } catch (error) {
    res
      .json(Response(null, null, "USER.REGISTER.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

// List users
export const getUsers = async (req, res) => {
  try {
    const listUsers = await UserDao.findAllUsers({ deletedAt: null });
    const userListFormat = await AllUserFormat(listUsers, req.user.role.level);
    res
      .json(
        Response(
          userListFormat,
          "USER.FIND.SUCCESS",
          "USER.FIND.ERROR.NOT_FOUND",
          !isEmpty(userListFormat)
        )
      )
      .status(!isEmpty(userListFormat) ? 200 : 404);
  } catch (error) {
    res.json(Response(null, null, "USER.LIST.ERROR.BAD_REQUEST")).status(400);
  }
};

// Update User
export const updateUserById = async (req, res) => {
  try {
    const user = userDto(req.body);
    const updateUser = await UserDao.updateUser(
      {
        _id: req.params.id,
      },
      user
    );
    res
      .json(
        Response(
          updateUser,
          "USER.UPDATE.SUCCESS",
          "USER.UPDATE.ERROR.BAD_REQUEST",
          !isEmpty(updateUser)
        )
      )
      .status(!isEmpty(updateUser) ? 200 : 400);
  } catch (error) {
    res.json(Response(null, null, "USER.UPDATE.ERROR.BAD_REQUEST")).status(400);
  }
};

// Get One User

export const getOneUser = async (req, res) => {
  try {
    const userFound = await UserDao.findUser({
      _id: req.params.id,
      deletedAt: null,
    });
    const userFormated = await userFormater(userFound);
    res
      .json(
        Response(
          userFormated,
          "USER.FIND.SUCCESS",
          "USER.FIND.ERROR.NOT_FOUND",
          !isEmpty(userFormated)
        )
      )
      .status(!isEmpty(userFormated) ? 200 : 404);
  } catch (error) {
    res.json(Response(null, null, "USER.FIND.ERROR.BAD_REQUEST")).status(400);
  }
};
