const express = require('express');

require('dotenv').config();

const Logger = require('js-logger');
const cors = require('cors');

const APIRouter = require('./api/server');
const APPRouter = require('./app/app');

const app = express();
const port = Number(process.env.PORT);
Logger.useDefaults();

// Show all logs when in development, only Warnings and errors in production
Logger.setLevel(process.env.NODE_ENV === 'production' ? Logger.ERROR : Logger.DEBUG);

app.use(express.json());
app.use(cors());

app.use('/api', APIRouter);
app.use('/', APPRouter);

// listen to port
app.listen(port, () => {
  Logger.info(`Server started at port ${port}.`);
});