const fs = require('fs');
const config = require('dotenv').config().parsed || process.env;


module.exports = {
  "development": {
    "username": "postgres",
    "password": null,
    "database": "abuz_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "nikolay",
    "password": "57k21x174",
    "database": "abuz_db",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "url": config.DATABASE_URL,
    "use_env_variable": "DATABASE_URL",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}