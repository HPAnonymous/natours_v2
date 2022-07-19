const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

console.log(process.env.NODE_ENV);

if (process.env.NOVE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/tours/', userRouter);

module.exports = app;
