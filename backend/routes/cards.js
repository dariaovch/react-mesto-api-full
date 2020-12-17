const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  // likeCard,
  // dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);

router.post('/cards', auth, createCard);

router.delete('/cards/:id', auth, deleteCard);

// router.put('cards/:id/likes', likeCard);

// router.delete('cards/:id/likes', dislikeCard);

module.exports = router;
