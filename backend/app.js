const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Назначаем порт, с которого приложение слушает запросы
const { PORT = 3000 } = process.env;

const app = express();

// Ошибки валидации запросов
const { errors } = require('celebrate');

// Логирование
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Пути для получения данных
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// Объект опций содержит свойства для совместимости mongoose и MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.json(), cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS',
  );
  next();
});

app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.use(errors());

// Централизованная обработка ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });

  // if (err.name === 'ValidationError') {
  //   res.status(400).send({ message: 'Переданы некорректные данные' });
  // } else if (err.name === 'CastError') {
  //   res.status(400).send({ message: 'Невалидный id' });
  // } else if (err.name === 'NotFoundError') {
  //   res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  // } else if (err.name === 'UnauthorizedError') {
  //   res.status(401).send({ message: '' });
  // } else {
  //   res.status(500).send({ message: 'На сервере произошла ошибка' });
  // }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The app is listening to port ${PORT}`);
});
