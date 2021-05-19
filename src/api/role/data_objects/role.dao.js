import Role from "../model/role.model";

// Get all roles
export const getRoles = async () => {
  const roles = await Role.find();
  return roles;
};

// Set a especific role
export const setRole = async ({ level, name }) => {
  const roleSaved = await new Role({
    level: level,
    name: name,
  });
  await roleSaved.save();
  return roleSaved;
};

// Update rolename
export const updateRole = async ({ level, name }) => {
  const roleUpdated = await Role.findOneAndUpdate(
    {
      level: level,
    },
    {
      name: name,
    },
    { new: true }
  );
  return roleUpdated;
};
