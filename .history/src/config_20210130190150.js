'use strict';
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://fdjhzedndjnoog:f7266377d7c3604314dcee79d2ef2e837c28920306d723a9ddc1184fc8bc2b17@ec2-3-231-46-238.compute-1.amazonaws.com:5432/d94ap2avcgm9g6',
  JWT_SECRET: process.env.JWT_SECRET || 'spaced-repetition-jwt-secret',

};