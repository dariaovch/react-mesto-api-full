const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('express').Router();

// Назначаем порт, с которого приложение слушает запросы
const { PORT = 3000 } = process.env;

const app = express();

// Ошибки валидации запросов
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');

// Логирование
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/users');

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

// app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS',
//   );
//   next();
// });

app.use(bodyParser.json());

app.use(requestLogger);

router.post('/signup', createUser);

router.post('/signin', login);

app.use(auth());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.use(errors());

// Централизованная обработка ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  } else if (err.name === 'CastError') {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The app is listening to port ${PORT}`);
});
