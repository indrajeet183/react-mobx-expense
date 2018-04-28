const port = process.env.PORT || 3099
const app = require ('./app')
// Connection URL
const db = require ('./db')
const url = process.env.MONGO_URI || 'mongodb://localhost:27017'

// Database Name


db.connect (url, (err) => {
  if (err) {
    console.log ('Unable to connect',err)
    process.exit(1)
  } else {
    app.listen (port)
    console.log ('Server started! At port' + port)
  }
})
