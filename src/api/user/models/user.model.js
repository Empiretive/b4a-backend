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
    status: {
      type: Number,
    },
    role: {
      ref: "Role",
      type: Schema.Types.ObjectId,
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("User", userSchema);
