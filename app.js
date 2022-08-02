const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoute');
const globalErrorHandler = require('./controllers/errorControllers');

const app = express();

app.set('view engine', 'pug');

// console.log(__dirname);

app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.use(express.json());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: `Too many request in this IP , plz try again in an hour`,
});

app.use(limiter);

console.log(process.env.NODE_ENV);

if (process.env.NOVE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'HP HIGHER',
    user: 'HP',
  });
});

app.use('/api/v1/tour/', tourRouter);
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/reviews/', reviewRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`cant query with ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
