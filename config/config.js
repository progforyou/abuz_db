const fs = require('fs');
const config = require('dotenv').config().parsed || process.env;


module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": "db.sqlite3"
  },
  "test": {
    "dialect": "sqlite",
    "storage": "db.sqlite3"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "db.sqlite3"
  }
}