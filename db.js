const MongoClient = require ('mongodb').MongoClient;
const dbName = 'expenseTest';

let state = {
  db: null,
};

exports.connect = (url, done) => {
  if (state.db) return done ();

    MongoClient.connect (url, (err, client) => {
    const db = client.db(dbName);
    state.db = db;
    done ();
  });
};

exports.get = () => {
  return state.db;
};

exports.close = done => {
  if (state.db) {
    state.db.close ((err, res) => {
      state.db = null;
      done (err);
    });
  }
};
