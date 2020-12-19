const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');

// Получаем модель пользователя
const User = require('../models/user');

// Получить список всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch(next);
};

// Получить пользовтаеля по айди
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

// Получить информацию о текущем пользователе
module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

// Создать пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch(next));
};

// Контроллер для логина

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'top-secret-formillion',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

// Обновить информацию о пользователе
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send(user))
    .catch(next);
};

// Обновить аватар пользователя
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send(user))
    .catch(next);
};
