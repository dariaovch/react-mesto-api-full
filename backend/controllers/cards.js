// Получаем модель карточки
const Card = require('../models/card');
// const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-err');

// Получить массив всех карточек
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(next);
};

// Создать карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  return Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch(next);
};

// Удалить карточку
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }

      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndRemove(card.id)
          .then((deletedCard) => {
            if (!deletedCard) {
              throw new NotFoundError('Запрашиваемый ресурс не найден');
            }
            res.status(200).send({ message: 'Карточка удалена' });
          });
      } else {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Невалидный id');
      }
      next(err);
    });
};

// Логика постановки и снятия лайка
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Запрашиваемый ресурс не найден');
    }
    res.status(200).send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Невалидный id');
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Невалидный id');
      }
      next(err);
    });
};
