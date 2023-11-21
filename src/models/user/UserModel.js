import UserSchema from "./UserSchema.js";

//insert new user
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

//get user by their @_id - string
export const getUserById = (_id) => {
  return UserSchema.findById(_id);
};

//get user by their @email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// update user

// Delete user
