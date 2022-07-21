/* eslint-disable import/no-useless-path-segments */
const express = require('express');

// eslint-disable-next-line import/no-useless-path-segments
const tourControllers = require('./../controllers/tourControllers');
const authController = require('./../controllers/authorController');

const tourRouter = express.Router();

tourRouter
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

tourRouter.route('/tourStar').get(tourControllers.tourStar);
tourRouter.route('/monthlyPlan:year').get(tourControllers.getMonthlyPlan);

tourRouter
  .route('/')
  .get(authController.protect, tourControllers.getAllTours)
  .post(tourControllers.createTour);
tourRouter
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourControllers.deleteTour
  );

module.exports = tourRouter;
