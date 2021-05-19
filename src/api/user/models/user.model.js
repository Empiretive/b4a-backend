import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    dni: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      ref: "Role",
      type: Schema.Types.ObjectId,
    },
    photo: {
      type: Schema.Types.Buffer,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
