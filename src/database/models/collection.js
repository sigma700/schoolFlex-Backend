import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    school: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school-searcher",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
console.log("New model with the name created");

collectionSchema.index({ user: 1, school: 1 }, { unique: true });

export const Collection = mongoose.model("Collection", collectionSchema);
