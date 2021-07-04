import { Schema, model } from "mongoose";

const settingSchema = new Schema(
  {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    value: {},
    deletedAt: Date,
  },
  {
    versionKey: false,
  }
);

export default model("Setting", settingSchema);
