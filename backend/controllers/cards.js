// Получаем модель карточки
const Card = require('../models/card');
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
  Card.findByIdAndRemove(req.params.id)
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch(next);
};

// Логика постановки и снятия лайка для дальнейшей доработки
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};
