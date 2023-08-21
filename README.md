# Mailer

## About

Mailer is a web application for building and executing e-mail marketing campaigns based on votes for a specific topic.
It is built with NodeJS with Express for the backend and ReactJS with Redux Toolkit for the frontend. It uses MongoDB as the database.
It uses Google OAuth 2.0 for authentication and authorization and it contains Stripe integration for payment processing.

### Use case scenario

A user clicks the "Login" button and logs is prompted with a list of Google accounts that he can use to log in to the system. After the Google authentication process is finished, he clicks on the "Add credits" button and is prompted with a Stripe payment form for credit card data. The system charges $5 for 5 credits, where each credit can be used to create one survey campaign. The user then proceeds to create a survey, inputs data such as subject, email body and recipients and then is greeted with an elegant survey form review page, before clicking the "Send survey" button, after which the emails are sent to the recipients, by using Nodemailer. Click tracking is also integrated into the system, meaning that every user vote will be tracked and carefully checked. The user can then view the created survey on his dashboard, with information regarding the number of votes and the date and time of the last response.

## Setup
Make sure to run "npm install" in the client and server subfolders to make sure you have all modules and dependencies installed.

In the server/config directory, you will find an example "keys-example.js file". Use that file to create a "keys.js" file with the same fulfilled parameters.\
\
What you'll need:
* For the Google OAuth 2.0 process, you'll need your Google client ID and client secret. Visit [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2) for more info and documentation.
* For cookie encryption and user identity management you'll need the "cookieKey" variable. Make sure to use a strong key for this.
* For Stripe (integrated payment provider), you'll need to create a Stripe account and generate your secret and public keys. Visit [Stripe documentation](https://stripe.com/docs) for more info and documentation.
* Running Ngrok on your local machine to tunnel voting requests to your local machine. Visit [Getting started with Ngrok](https://ngrok.com/docs/getting-started/) for more info and documentation.
  * Note for Ngrok: the "nodemailerRedirectDomain" parameter should contain the generated "HTTPS" URL after starting Ngrok. This public address will be used for forwarding and tunneling to your local machine.
* The SMTP server name of the email provider you are using.
  * Example: "smtp-mail.outlook.com" is the SMTP server name of the Outlook email provider.
* The SMTP server port of the email provider you are using.
  * Example: "587" is the SMTP server port of the Outlook email provider.
* JSON Web Token (JWT) used for vote click tracking. Make sure to generate a unique and strong token for this.

In both FE and BE subfolders (client and server directories), you will need .env files.\
\
The client .env file should contain:
* "REACT_APP_STRIPE_KEY" - the Stripe public key

The server .env file shoulld contain:
* "SERVER_PORT" - the server port your express API is running on
* "MONGO_URI" - the full URI to the MongoDB instance you're using, including the database name
* "GOOGLE_AUTH_CALLBACK_URL" - the URL callback used during the authentication process
* "MAILER_OUTLOOK_EMAIL" - the email that will be used to send out emails
* "MAILER_OUTLOOK_PASSWORD" - the password of the email
