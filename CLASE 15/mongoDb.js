const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority';

const connectDb = () => {
  return mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connectDb;
