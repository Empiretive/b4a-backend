import { Schema, model } from "mongoose";

const RoleSchema = new Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Role", RoleSchema);
