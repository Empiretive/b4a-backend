import * as roleDao from "../../role/data_objects/role.dao";
import * as stateDao from "../../states/data_objects/state.dao";
export const userFormater = async (user) => {
  try {
    const role = await roleDao.getRole({
      _id: user.role,
    });
    const state = await stateDao.getState("USER", user.status);
    return {
      _id: user._id,
      dni: user.dni,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: {
        level: role.level,
        name: role.name,
      },
      photo: user.photo,
      status: {
        name: state.name,
        value: state.value,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export const AllUserFormat = async (userList, role) => {
  let usersFormateds = [];
  for (const user of userList) {
    const rolefound = await roleDao.getRole({
      _id: user.role,
    });
    if (role <= rolefound.level) {
      const userFormat = await userFormater(user);
      usersFormateds.push(userFormat);
    }
  }
  return usersFormateds;
};
