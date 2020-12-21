const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  getCurrentUserInfo,
  createUser,
  login,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getCurrentUserInfo);

router.get('/users/:id', auth, getUser);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(6).unique().email(),
    password: Joi.string().min(6).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(6).unique().email(),
    password: Joi.string().min(6).max(30),
  }),
}), login);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), auth, updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), auth, updateAvatar);

module.exports = router;
