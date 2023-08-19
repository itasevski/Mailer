const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  recipients: [RecipientSchema], // an array of recipients, each array item is of type "Recipient" that follows the "RecipientSchema"
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  // underscore gets added as a prefix by convention when we have a field that references another collection (when we have a relation),
  // type is an ObjectId which MongoDB documents contain, ref is the name of the referenced collection
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model("surveys", surveySchema);
