import TransSchema from "./TransSchema.js";

//Create transaction
export const insertTrans = (transObj) => {
  return TransSchema(transObj).save();
};

//Read transactions by user _id
export const getUserTrans = (userId) => {
  return TransSchema.find({ userId });
};

//Delete transactions

export const deleteTrans = (userId, idsArg) => {
  return TransSchema.deleteMany({
    userId,
    _id: {
      $in: idsArg,
    },
  });
};

//Update transactions -homework
