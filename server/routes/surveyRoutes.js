const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../templates/emailTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get("/api/surveys/submit/:surveyId/:option", (req, res) => {
    res.send(
      "<h1 style=text-align:center;margin-top:20px>Thank you for your feedback!</h1>"
    );
  }); // route that user will be redirected to once feedback is given (anchor tags in the surveyTemplate)

  app.post(
    "/api/surveys/create",
    requireLogin,
    requireCredits,
    async (req, res) => {
      const { title, subject, body, recipients } = req.body; // 1. extract needed parameters from request body

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients
          .split(",")
          .map((recipient) => ({ email: recipient.trim() })),
        _user: req.user.id,
        dateSent: Date.now(),
      }); // 2. create Survey object

      const mailer = new Mailer(survey, surveyTemplate(survey));
      // 3. create Mailer object that accepts the survey data and survey email HTML template

      try {
        const response = await mailer.send();
        await survey.save(); // 4. save Survey document to collection

        req.user.credits -= 1; // 5. deduct user credits
        const user = await req.user.save(); // 6. save updated User document
        // console.log(nodemailer.getTestMessageUrl(response));
        // the getTestMessageUrl() function from nodemailer takes the received response from the sendMail() function and if ethereal emails are
        // present, it will generate an ethereal website link where we can see the ethereal email (https://ethereal.email/message/ZJDJlrNWg-fZLfmkZJDJmIw0bmaBu-WPAAAAAcpQNmXfKrg2rg2G2WM1Tmg)
        res.send(user); // 7. send back response containing updated User
      } catch (err) {
        res.status(422).send(err);
        // return a response with status 422 (Unprocessable entity) if error is thrown and catched
      }
    }
  );
};
