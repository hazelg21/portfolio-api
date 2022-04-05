
require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const API_KEY = process.env.SENDGRID_API;
const WORK_ACCOUNT = process.env.WORK_EMAIL;

sgMail.setApiKey(API_KEY)

sendEmail = (reqBody) => {
    const message = {
        to: WORK_ACCOUNT,
        from: {
            name: "From React Portfolio",
            email: WORK_ACCOUNT
        },
        subject: "Contact Form in React Portfolio",
        text: `From: ${reqBody.name}, Email: ${reqBody.email}, Contact Number: ${reqBody.contactNo}, Message: ${reqBody.msg}`,
        html: `<h1>From: ${reqBody.name}</h1>
        <h2>Email: ${reqBody.email}</h2>
        <p>Contact Number: ${reqBody.contactNo}</p>
        <p>Message: ${reqBody.msg}</p>`
    }

    return sgMail.send(message)
        .then((result) => {
            console.log('Email sent...', result)
            return result
        })
        .catch((error) => console.log(error.message));
}

module.exports = {
    sendEmail
}