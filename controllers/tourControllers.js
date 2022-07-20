// eslint-disable-next-line import/no-useless-path-segments
const Tour = require('./../models/tourModels');
const APIfeature = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// eslint-disable-next-line arrow-body-style
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIfeature(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tour = await features.query;

  res.status(200).json({
    status: 'Success',
    length: tour.length,
    data: {
      tour,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  // const newTour = new Tour({});
  // newTour.save().then();
  const newTour = await Tour.create(req.body);

  res.status(200).json({
    status: 'success',
    data: newTour,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.tourStar = catchAsync(async (req, res, next) => {
  const tour = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        totalQuantity: { $sum: 1 },
        ratingsAvg: { $avg: '$ratingsAverage' },
        numRating: { $sum: '$ratingsQuantity' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        avgPrice: { $avg: '$price' },
      },
    },
    {
      $sort: {
        ratingsAvg: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDate: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTour: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTour: -1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
