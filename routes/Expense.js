const express = require ('express')
const router = express.Router ()

let db = require ('../db')

/**
   * Returns the expense
   */
router.get ('/', (req, res) => {
  
  //console.log(db.get());
  let expenseCollection = db.get ().collection ('expenseTrack')
  
  expenseCollection.find({}).toArray((err, docs) => {    
    res.status(200).send(docs)
  })  
})

/**
   * Stores the expense in db
   */
router.post ('/addExpense', (req, res) => {
  let expenseCollection = db.get ().collection ('expenseTrack')
  expenseCollection.insert (req.body, (err, result) => {
    if (err) console.log (err)
    else res.status (200).send (result.ops)
  })
})

/**
   * Gets dated expense from db
   */
  router.get('/getExpense/:date', (req, res) => {
    let expenseCollection = db.get ().collection ('expenseTrack')
    const date = req.params.date
    console.log(date)    
    expenseCollection.find({date}).toArray(function(err, result) {
      if (err) throw err;
      res.status(200).send(result)
    });
  })


module.exports = router
