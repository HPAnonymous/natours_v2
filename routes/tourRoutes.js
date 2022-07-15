const express = require('express');

const tourControllers = require('./../controllers/tourControllers');

const tourRouter = express.Router();
const route = express.Router();

tourRouter
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);
tourRouter.route('/:id').get(tourControllers.getTour);

module.exports = tourRouter;
