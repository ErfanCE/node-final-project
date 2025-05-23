const express = require('express');
const morgan = require('morgan');

const { connectToDatabase } = require('./database/database-connection');
const { AppError } = require('./utils/app-error');

const appRouter = require('./routers/app-router');

const app = express();

connectToDatabase();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appRouter);

app.all('/*splat', (req, res, next) => {
  next(new AppError(404, `cant't find ${req.method} ${req.originalUrl}`));
});

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    status = 'error',
    message = 'internal server error'
  } = err;

  res.status(statusCode).json({ status, message });
});

module.exports = { app };
