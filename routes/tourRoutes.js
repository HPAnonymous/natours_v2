const express = require('express');

// eslint-disable-next-line import/no-useless-path-segments
const tourControllers = require('./../controllers/tourControllers');

const tourRouter = express.Router();

tourRouter
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

tourRouter.route('/tourStar').get(tourControllers.tourStar);
tourRouter.route('/monthlyPlan:year').get(tourControllers.getMonthlyPlan);

tourRouter
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);
tourRouter
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour);

module.exports = tourRouter;
