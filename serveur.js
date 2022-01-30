const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || '8000';
const db = process.env.ATLAS_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error');
  });

app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(port, () => {
  console.log(`listen to port at ${port}`);
});
