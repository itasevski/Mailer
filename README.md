# Mailer

## About

Mailer is a web application for building and executing e-mail marketing campaigns based on votes for a specific topic.
It is built with NodeJS with Express for the backend and ReactJS with Redux Toolkit for the frontend. It uses MongoDB as the database.
It uses Google OAuth 2.0 for authentication and authorization and it contains Stripe integration for payment processing.

### Use case scenario

A user clicks the "Login" button and logs is prompted with a list of Google accounts that he can use to log in to the system. After the Google authentication process is finished, he clicks on the "Add credits" button and is prompted with a Stripe payment form for credit card data. The system charges $5 for 5 credits, where each credit can be used to create one survey campaign. The user then proceeds to create a survey, inputs data such as subject, email body and recipients and then is greeted with an elegant survey form review page, before clicking the "Send survey" button, after which the emails are sent to the recipients, by using Nodemailer. Click tracking is also integrated into the system, meaning that every user vote will be tracked and carefully checked. The user can then view the created survey on his dashboard, with information regarding the number of votes and the date and time of the last response.
