const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const auth = require('../middlewares/auth');
const validator = require('validator');

const {
  getUsers,
  getUser,
  getCurrentUserInfo,
  // createUser,
  // login,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const CastError = require('../errors/cast-error');

const urlValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new CastError('Переданы некорректные данные');
  }
  return value;
};

router.get('/me', getCurrentUserInfo);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidator),
  }),
}), updateAvatar);

router.get('/', getUsers);

module.exports = router;
