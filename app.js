const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const mangoose = require('mongoose')
const url = 'mongodb://localhost:27017/Employee' 
const app= express()
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection
con.on('open',() => {
    console.log('Connected............')
})
app.use(express.json())
app.use(cors());
const employeesRouter = require('./routes/employees')
app.use('/employees',employeesRouter)
app.listen(9000,() => {
    console.log("Server is started.......")
})