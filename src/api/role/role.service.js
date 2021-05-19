import * as RoleDao from "./data_objects/role.dao";
import { Response } from "../../common/response";

// Find all roles
export const findRoles = async (req, res) => {
  try {
    const roles = await RoleDao.getRoles();
    const response = Response(
      roles,
      "ROLES.FOUND.SUCCESS",
      "ROLES.NOT_FOUND",
      roles.length > 0
    );
    res.json(response).status(roles.length > 0 ? 200 : 404);
  } catch (error) {
    res.json("ROLE.ERROR.BAD_REQUEST").status(400);
  }
};

// Change Roles names
export const changeRoleName = async (req, res) => {
  const roles = req.body.roles;
  const rolesUpdate = await Promise.all(
    roles.map((role) => {
      return RoleDao.updateRole(role);
    })
  );
  const response = Response(
    rolesUpdate,
    "ROLES.UPDATED.SUCCESS",
    "ROLES.UPDATE.ERROR",
    rolesUpdate.length > 0
  );
  res.send(response).status(rolesUpdate.length > 0 ? 200 : 400);
};

/*_________________________________________________________*/
// Setup of role

// Initial Setup of roles
export const setRoles = async (req, res) => {
  try {
    const rolesFound = await RoleDao.getRoles();
    if (rolesFound.length > 0) {
      res.json(Response(null, null, "Roles already exists", false)).status(400);
      return 0;
    } else {
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

      const response = Response(
        dataRole,
        "ROLES.CREATEDS.SUCCESS",
        "ROLES.CANT_BE_CREATED",
        dataRole.length > 0 && dataRole != null
      );
      res.json(response).status(dataRole ? 201 : 404);
    }
  } catch (error) {
    res.json({ message: "ROLE.ERROR.BAD_REQUEST" }).status(400);
  }
};
