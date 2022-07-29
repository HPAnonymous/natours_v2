/* eslint-disable import/extensions */
/* eslint-disable import/no-useless-path-segments */
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIfeature = require('./../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // const newDoc = new Model({});
    // newDour.save().then();
    const newDoc = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      data: newDoc,
    });
  });

exports.getOne = (Model, optionPupulate) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (optionPupulate) query = query.populate(optionPupulate);
    const doc = await query;

    // const doc = await Model.findById(req.params.id).populate('reviews');

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIfeature(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'Success',
      length: doc.length,
      data: {
        data: doc,
      },
    });
  });
