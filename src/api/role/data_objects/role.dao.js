import Role from "../model/role.model";

// Get One role
export const getRole = async (query) => {
  const role = await Role.findOne(query);
  return role;
};

// Get all roles
export const getRoles = async () => {
  const roles = await Role.find().sort("level");
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

// Update role name
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
