import * as stateDao from "./data_objects/state.dao";
import { Response } from "../../common/response";
import { isEmpty } from "lodash";

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

export const getUserStates = async (req, res) => {
  try {
    const userStates = await stateDao.getStates("USER");
    res
      .json(
        Response(
          userStates,
          "STATES.USER.FIND.SUCCESS",
          "STATES.USER.ERROR.BAD_REQUEST",
          !isEmpty(userStates)
        )
      )
      .status(!isEmpty(userStates) ? 200 : 400);
  } catch (error) {
    res
      .json(Response(error, null, "STATES.USER.ERROR.BAD_REQUEST"))
      .status(400);
  }
};
