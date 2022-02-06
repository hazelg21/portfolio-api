const express = require("express")
const contactMe = require("../controllers/contact.js");
const router = express.Router()



router.post('/contactMe', async (request, response) => {
    const sendingStat = await contactMe.sendEmail(request.body);
    // console.log(sendingStat)
})

module.exports = router;