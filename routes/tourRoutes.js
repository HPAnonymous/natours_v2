/* eslint-disable import/no-useless-path-segments */
const express = require('express');

// eslint-disable-next-line import/no-useless-path-segments
const tourController = require('../controllers/tourControllers');
const authController = require('./../controllers/authorController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoute');

const tourRouter = express.Router();

tourRouter.use('/:tourId/reviews', reviewRouter);

tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter.route('/tourStar').get(tourController.tourStar);
tourRouter.route('/monthlyPlan:year').get(tourController.getMonthlyPlan);

tourRouter
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

tourRouter
  .route('/distances/:latlng/unit/:unit')
  .get(tourController.getDistances);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// tourRouter
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = tourRouter;
