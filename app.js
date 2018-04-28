const express = require ('express')
const app = express ()
const bodyParser = require ('body-parser')
const expenseRoute = require ('./routes/Expense')

app.use (bodyParser.json ()) // support json encoded bodies
app.use (bodyParser.urlencoded ({extended: true})) // support encoded bodies// 

// routes will go here
app.use ('/expense',expenseRoute)

module.exports = app 
