//this is where we are able to make a connection to our mongodb database

import mongoose from "mongoose";
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDb was succesfully connected");
  } catch (error) {
    console.log("There was an error with connectignto mongodb", error.message);
    process.exit(1);
  }
};
