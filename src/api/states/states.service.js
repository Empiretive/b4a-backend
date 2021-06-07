import * as stateDao from "./data_objects/state.dao";

// Create User States

export const createUserStates = async (req, res) => {
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
  res.json(userStates);
};
