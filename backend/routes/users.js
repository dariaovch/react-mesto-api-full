const router = require('express').Router();
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

router.get('/users/:id', auth, getUser);

router.get('/users/me', auth, getCurrentUserInfo);

router.post('/signup', createUser);

router.post('/signin', login);

router.patch('/users/me', auth, updateUser);

router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = router;
