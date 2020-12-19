const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), auth, createCard);

router.put('cards/:cardId/likes', auth, likeCard);

router.delete('cards/:cardId/likes', auth, dislikeCard);

router.delete('/cards/:id', auth, deleteCard);

module.exports = router;
