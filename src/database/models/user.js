//creating an instance of users since there will be user and admin

import { model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, reqired: true },
    number: { type: String, reqired: true },
    email: { type: String, reqired: true },
    name: { type: String, reqired: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);
export { User };
