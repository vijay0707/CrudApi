const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const mangoose = require('mongoose')
dotenv.config()

const url = process.env.MONGO_URI
const PORT = 9000;
const app = express()
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
    console.log('Connected to db!')
})
app.use(express.json())
app.use(cors());
const employeesRouter = require('./routes/employees')
app.use('/employees', employeesRouter)
app.listen(PORT, () => {
    console.log(`Server is started at localhost:${PORT}`)
})

module.exports = app;