import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: String,
    description: String,
    color: String,
    status: Number,
    deletedAt: Date,
  },
  {
    versionKey: false,
  }
);

export default model("Category", categorySchema);
