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
    throw new CastError('Передана некорректная ссылка');
  }
  return value;
};

router.get('/users', getUsers);

router.get('users/me', getCurrentUserInfo);

router.get('users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUser);

router.patch('users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidator),
  }),
}), updateAvatar);

module.exports = router;
