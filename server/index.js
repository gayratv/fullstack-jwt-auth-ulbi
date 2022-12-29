// require('dotenv').config({ path:'./server/.env'})
const path = require("path");
/*
console.log(__dirname)      // server
console.log(process.cwd()) // client
console.log( path.join(__dirname, '/.env'));*/
require('dotenv').config({path: path.join(__dirname, '/.env')});

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  console.log('------- START');
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
