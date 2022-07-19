const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

async function main() {
  await mongoose.connect(DB);
  console.log('connect DB successfully');
}

main().catch((err) => console.log(err));

const port = 3000;

app.listen(port, () => {});
