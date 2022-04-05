const express = require("express")
const contactMe = require("../controllers/contact.js");
const sendmail = require("../controllers/sendmail.js");
const router = express.Router()


router.post('/contactMe', (request, response) => {
    contactMe.sendToMe(request.body).then(result => response.send(result))
})

router.post('/sendEmail', (request, response) => {
    sendmail.sendEmail(request.body).then(result => response.send(result))
})

module.exports = router;