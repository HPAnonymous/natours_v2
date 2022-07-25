/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
const mongoose = require('mongoose');
// const slugify = require('slugify');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../models/tourModels');

dotenv.config({ path: './config.env' });

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(data);
    console.log('file add done');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
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
