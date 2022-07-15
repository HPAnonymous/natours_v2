const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware using to add data from body to request object
app.use(express.json());
app.use(morgan('dev'));



app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/tours/', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log('App Listening on port ' + port);
});
