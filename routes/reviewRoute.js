/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const authorController = require('./../controllers/authorController');
const reviewController = require('./../controllers/reviewController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(authorController.protect);

reviewRouter
  .route('/')
  .post(
    authorController.restrictTo('user'),
    reviewController.setTourAndUserId,
    reviewController.createReview
  )
  .get(reviewController.getAllReview);

reviewRouter
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authorController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authorController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = reviewRouter;
