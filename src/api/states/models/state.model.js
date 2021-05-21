import { Schema, model } from "mongoose";

const stateSchema = new Schema(
  {
    entity: {
      type: String,
    },
    value: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default model("State", stateSchema);
