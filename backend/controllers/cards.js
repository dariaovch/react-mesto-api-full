// Получаем модель карточки
const Card = require('../models/card');

// Получить массив всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

// Создать карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

// Удалить карточку
module.exports.deleteCard = (req, res) => {
  // const cardId = req.params.id;

  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

// Логика постановки и снятия лайка для дальнейшей доработки
// module.exports.likeCard = (req, res) => {
//   Card.findByIdAndUpdate(req.params.id,
//     { $addToSet: { likes: req.user._id } },
//     { new: true })
//     .then((card) => res.status(200).send(card))
//     .catch(() => {
//       res.status(500).send({ message: 'Произошла ошибка сервера' });
//     });
// };

// module.exports.dislikeCard = (req, res) => {
//   Card.findByIdAndUpdate(req.params.id,
//     { $pull: { likes: req.user._id } },
//     { new: true })
//     .then((card) => res.status(200).send(card))
//     .catch(() => {
//       res.status(500).send({ message: 'Произошла ошибка сервера' });
//     });
// };
