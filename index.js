require('dotenv').config()

const express = require("express")
const cors = require("cors")

const app = express()
const port = 4000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const contactRoute = require("./routes/contact")

app.use("/api/portfolio", contactRoute)

app.listen(process.env.PORT || port, () => console.log(`Now listening to port ${process.env.PORT || port}`))

