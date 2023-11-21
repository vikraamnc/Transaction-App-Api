import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    if (!process.env.MONGO_URL) {
      return console.log(
        "No mongodb connection url is found, please add MONGO_URL in your env variable"
      );
    }
    const con = await mongoose.connect(process.env.MONGO_URL);
    con && console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
