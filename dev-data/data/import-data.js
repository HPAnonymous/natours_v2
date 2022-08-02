/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
const mongoose = require('mongoose');
// const slugify = require('slugify');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../models/tourModels');
const User = require('./../../models/userModels');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env' });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('file add done');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('File has been delete');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

async function main() {
  await mongoose.connect(DB);

  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
}

main().catch((err) => console.log(err));
