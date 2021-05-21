import User from "../models/user.model";
import Role from "../../role/model/role.model";
import { isEmpty } from "lodash";

// Find one User some time, by a query or not
export const findUser = async (query) => {
  const userFound = await User.findOne(query).populate("role", "name level");
  return userFound;
};

// Find all user with the query condition
export const findAllUsers = async (query = null) => {
  const users = await User.find(query).populate("role", "level name");
  return users;
};

// Register a user
export const registerUser = async (user) => {
  let role = await Role.findOne({
    level: user.role,
  });
  if (isEmpty(role)) {
    role = await Role.findOne({
      level: 4,
    });
  }
  user.role = role._id;
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

// Update User
export const updateUser = async (query, user) => {
  const userFound = await User.findOne(query);

  let role = await Role.findOne({
    level: user.role,
  });
  if (isEmpty(role) || role == null) {
    role._id = userFound.role;
  }
  user.role = role._id;
  console.log(user);
  const userUpdated = await User.findByIdAndUpdate(userFound._id, user, {
    new: true,
  });
  return userUpdated;
};

export const savedToken = async (user_id, token) => {
  const userSaved = await User.findByIdAndUpdate(
    user_id,
    { token: token },
    {
      new: true,
    }
  );
  return userSaved;
};
