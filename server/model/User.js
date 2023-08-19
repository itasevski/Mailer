const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }, // if we want to add default values
});
// create a schema that defines a given model and its properties

mongoose.model("users", userSchema);
// model is used to construct documents (entities/records) in a given collection, as defined in the userSchema
// this line creates our collection called "users", if it exists, it does nothing
