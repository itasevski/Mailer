const mongoose = require("mongoose");
const { Path } = require("path-parser");
const { URL } = require("url");
const {
  mailTrackingJWTToken,
  nodemailerRedirectDomain,
} = require("../config/keys");

const Survey = mongoose.model("surveys");

module.exports = {
  baseUrl: `${nodemailerRedirectDomain}/api/surveys/submit/:surveyId/:option`,
  jwtSecret: mailTrackingJWTToken,
  getData: (data) => {
    // required
    /* 
      Default data: { recipient: "rcptto@mail.fake" }
      Add any data if you want
    */
  },
  onBlankImageView: (data) => {
    // required
    /* 
      When email is opened 
      data is default data + your data
    */
  },
  onLinkClick: (data) => {
    // required
    /* 
        When click on link in mail 
        data is default data + { link } + your data
      */

    const path = new Path("/api/surveys/submit/:surveyId/:option");
    const { surveyId, option } = path.test(new URL(data.link).pathname); // pathname is everything after the TLD i.e the path of the URL
    // will return the URL path parameters

    Survey.updateOne(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: { email: data.recipient, responded: false },
        },
      }, // find the survey that holds the clicked link, access its recipients and when you find the recipient with the same email as the one
      // that has clicked the "Yes" or "No" link that hasn't as of yet voted...
      {
        $inc: { [option]: 1 }, // ... increment the "yes" or "no" field of the survey by 1, depending on link that was clicked...
        $set: { "recipients.$.responded": true },
        // ... and set the "responded" boolean field of the recipient to false ("$" is the result from the elemMatch)...
        lastResponded: new Date(), // ... and update the lastResponded date of the survey
      }
    ).exec();

    return data;
  },
};
