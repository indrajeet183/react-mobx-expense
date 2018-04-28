const request = require ('supertest');
const app = require ('../../app');
const db = require ('../../db.js');
const url = 'mongodb://localhost:27017';

beforeAll (done => {
  db.connect (url, err => {
    if (err) {
      console.log ('Unable to connect', err);
      process.exit (1);
    }
  });
});

afterAll (done => {
  db.close ();
});

test ('should response the GET method',done => {
    const res = request (app).get ('/expense');
    return res
      .then (json => {
        console.log (json.body.length);
        expect (json.body.length).toBe (1, done ());
      })
      .catch (err => {});
  },10000);

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

//     it ('should get item length', () => {
//       const res = request (app).get ('/')
//       console.log (res)
//     })
//   })
