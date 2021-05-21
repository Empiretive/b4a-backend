import { isEmpty } from "lodash";
import State from "../models/state.model";

export const createState = async ({ entity, states }) => {
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
