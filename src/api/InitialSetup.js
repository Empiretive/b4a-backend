import * as RoleDao from "./role/data_objects/role.dao";
import * as stateDao from "./states/data_objects/state.dao";
import * as UserDao from "./user/data_objects/user.dao";

import { Response } from "../common/response";
import { encryptPassword } from "../utils/passwordCrypt";

export const InitialSetup = async (req, res) => {
  try {
    // Roles
    const roles = [
      {
        level: 1,
        name: "admin",
      },
      {
        level: 2,
        name: "manager",
      },
      {
        level: 3,
        name: "employee",
      },
      {
        level: 4,
        name: "client",
      },
    ];

    let dataRole = await Promise.all([
      RoleDao.setRole(roles[0]),
      RoleDao.setRole(roles[1]),
      RoleDao.setRole(roles[2]),
      RoleDao.setRole(roles[3]),
    ]);

    // Estados de usuarios
    const userStates = await stateDao.createState({
      entity: "USER",
      states: [
        {
          value: 1,
          name: "Activo",
        },
        {
          value: 2,
          name: "Inactivo",
        },
      ],
    });

    // Crear usuario Admin
    const password = await encryptPassword("admin");
    const user = await UserDao.registerUser({
      dni: 1,
      name: "admin",
      lastName: "",
      phone: "",
      email: "admin",
      role: 1,
      password: password,
      status: 1,
    });

    res
      .json(Response({ user, roles: dataRole, userStates: userStates }))
      .status(200);
  } catch (error) {}
};
