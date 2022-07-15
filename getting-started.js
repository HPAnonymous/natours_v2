const mongoose = require('mongoose');



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://admin:admin@cluster0.381xt.mongodb.net/?retryWrites=true&w=majority';
async function main() {
  await mongoose.connect(uri);
}
main().catch((err) => console.log(err));
