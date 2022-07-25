/* eslint-disable import/extensions */
/* eslint-disable import/no-useless-path-segments */
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModels');
const APIfeature = require('./../utils/apiFeatures');

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIfeature(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: 'Success',
    length: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfrim)
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );

  const filteredObj = filterObj(req.body, 'name', 'email');
  console.log(filteredObj);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    message: 'dones',
  });
});
