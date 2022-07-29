/* eslint-disable import/extensions */
/* eslint-disable import/no-useless-path-segments */
const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
// const APIfeature = require('./../utils/apiFeatures');
// const catchAsync = require('../utils/catchAsync')
// const AppError = require('./../utils/appError');

exports.setTourAndUserId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getReview = factory.getOne(Review);
exports.getAllReview = factory.getAll(Review);
