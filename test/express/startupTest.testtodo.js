//TODO - After Connecting to Server
const request = require ('supertest');
const app = require ('../../app');
const db = require ('../../db.js');
const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'

beforeAll (done => {
  db.connect (url, err => {
    if (err) {
      console.log ('Unable to connect', err);
      process.exit (1);
    }else{
        console.log('Succesfully connected')
        done();
    }
  });
});

afterAll (done => {
  db.close (() => done());
});


// test ('should response the GET method',() => {
//     const res = request (app).get ('/expense');
//     return res
//       .then (json => {
//         expect (json.body.length).toBe (1);
//       })
//       .catch (err => {});
//   });

// test('Test for saving expense via REST', (done) => {
//     request (app)
//       .post ('/')
//       .send ({
//         date: new Date ().toLocaleDateString (),
//         items: [
//           {name: 'First Item', price: 20, quantity: 4},
//           {name: 'Second Item', price: 10, quantity: 2},
//           {name: 'Third Item', price: 5, quantity: 1},
//         ],
//       })
//       .expect (200, done)      
//   })
