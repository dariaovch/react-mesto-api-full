const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  getCurrentUserInfo,
  // createUser,
  // login,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', auth, getUsers);

router.get('/me', auth, getCurrentUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), auth, updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), auth, updateAvatar);

router.get('/:id', auth, getUser);

module.exports = router;
