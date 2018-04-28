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
router.post ('/', (req, res) => {
  let expenseCollection = db.get ().collection ('expenseTrack')
  expenseCollection.insert (req.body, (err, result) => {
    if (err) console.log (err)
    else res.status (200).send (result.ops)
  })
})

module.exports = router
