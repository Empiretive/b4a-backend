import { isEmpty } from "lodash";
import State from "../models/state.model";

export const getState = async (entity, value) => {
  const state = await State.findOne({
    entity: entity,
    value: value,
  });
  return state;
};

export const createState = async ({ entity, states }) => {
  const stateRepeat = await State.find({
    entity: entity,
    name: { $in: states.map((state) => state.name) },
    value: { $in: states.map((state) => state.value) },
  });

  if (!isEmpty(stateRepeat)) {
    return 0;
  }

  let statesCreated = [];
  if (!isEmpty(states)) {
    for (const state of states) {
      const newState = new State({
        entity: entity,
        value: state.value,
        name: state.name,
      });
      console.log(newState);
      await newState.save();
      statesCreated.push(newState);
    }
  }
  return statesCreated;
};
