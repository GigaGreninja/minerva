//const { MongoClient, ObjectID } = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

const debug = require('debug')('app:contentController');

function contentController(nav) {
  function getIndex(req, res) {
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'MinervaDatabase';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('books');

        const books = await col.find().toArray();

        res.render(
          'bookListView',
          {
            nav,
            title: 'Minerva',
            books
          }
        );
      } catch (err) {
        error('Failed connecting to mongo, no articles available');
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'MinervaDatabase';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('books');

        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);

        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book
          }
        );
      } catch (err) {
        debug('Failed connecting to mongo, no lesson details available');
        debug(err.stack);
      }
    }());
  }
  function middleware(req, res, next) {
    //if (req.user) {
    next();
    //} else {
    // res.redirect('/');
    // }
  }
  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = contentController;