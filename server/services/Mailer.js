const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const { sendMail } = require("nodemailer-mail-tracking");
const mailTrackingOptions = require("../util/mailTrackingOptions");

class Mailer {
  constructor({ recipients, subject, body }, template) {
    this.from = `"Mailer" ${process.env.MAILER_OUTLOOK_EMAIL}`;
    // what we want to appear in the "From" field. Email must be the one used during Outlook authentication (from auth object below)
    this.to = this.formatAddresses(recipients);
    this.subject = subject;
    this.text = body;
    this.html = template; // what appears in the received email
  }

  createNodemailerTransport = () => {
    // // the createTestAccount() function from nodemailer can be used to create ethereal emails for testing purposes
    // const testAccount = await nodemailer.createTestAccount();
    // return nodemailer.createTransport({
    //   host: testAccount.smtp.host,
    //   port: testAccount.smtp.port,
    //   secure: testAccount.smtp.secure,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // }); // test transport object used to send ethereal emails
    return nodemailer.createTransport({
      host: keys.nodemailerSmtpServerName, // outlook SMTP server
      port: keys.nodemailerSmtpServerPort, // outlook SMTP server port
      secure: false, // establish a non-secure connection
      auth: {
        user: process.env.MAILER_OUTLOOK_EMAIL,
        pass: process.env.MAILER_OUTLOOK_PASSWORD,
      }, // auth object must be provided with a real outlook username (email) and password in order to authenticate as a user who
      // will be the sender of the emails. If not provided or incorrect, authentication error will be thrown
      // real transport object used to send real emails
    });
  };

  formatAddresses = (recipients) => {
    return recipients.map(({ email }) => email);
  };

  send = async () => {
    const transporter = this.createNodemailerTransport();
    // const response = await transporter.sendMail(this.createMessage());
    // sendMail() uses the configured transporter to send emails with specified configuration
    const response = await sendMail(
      mailTrackingOptions,
      transporter,
      this.createMessage()
    );
    // instead of using nodemailer's sendMail() method, we use the sendMail() method from the "nodemailer-mail-tracking" library in order to
    // include mail/link tracking. This method accepts our custom mail tracking configuration, our custom configured transporter and the
    // message object. We need this so that we can record which person has voted already in a given campaign, thus avoiding the chances that
    // someone can vote more than one time.
    // If we don't need mail tracking, use nodemailer's sendMail() method.
    return response;
  };

  createMessage = () => {
    return {
      from: this.from,
      to: this.to,
      subject: this.subject,
      text: this.text,
      html: this.html,
    }; // object with parameters set in constructor
  };
}

module.exports = Mailer;
