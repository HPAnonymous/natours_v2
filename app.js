const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorControllers');

const app = express();

app.use(express.json());

console.log(process.env.NODE_ENV);

if (process.env.NOVE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tour/', tourRouter);
app.use('/api/v1/user/', userRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`cant query with ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
