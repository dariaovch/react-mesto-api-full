const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const auth = require('../middlewares/auth');
const validator = require('validator');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const CastError = require('../errors/cast-error');

const urlValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new CastError('Переданы некорректные данные');
  }
  return value;
};

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), dislikeCard);

module.exports = router;
