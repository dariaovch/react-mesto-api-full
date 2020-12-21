const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  getCurrentUserInfo,
  // createUser,
  // login,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUserInfo);

router.get('/users', getUsers);

router.get('/:id', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

router.get('/:id', getUser);

module.exports = router;
