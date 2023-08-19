const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

module.exports = recipientSchema;
// since this schema is only going to be used to store the recipients of a survey as a subcollection in the Surveys collection, we don't need to
// create a model of it, since that would mean creating a new collection. We just export it, so that it can be used in the Survey collection
