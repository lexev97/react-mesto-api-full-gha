require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsHandler } = require('./middlewares/cors');
const { linkRegex } = require('./constants/constants');
const {
  NOT_FOUND,
  SERVER_ERROR,
  BAD_REQUEST,
  CONFLICT,
} = require('./errors/statusCodes');
const { login, addUser } = require('./controllers/users');

const { PORT = 5000, MONGOOSE_DB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGOOSE_DB);

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

app.use(corsHandler);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string().pattern(linkRegex).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    }),
  }),
  addUser,
);
app.get('/signout', (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Сеанс завершен' });
});

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err.code === 11000) {
    res.status(CONFLICT).send({ message: 'Такой email уже зарегистрирован' });
    return;
  }

  res.status(SERVER_ERROR).send({
    message: 'На сервере произошла ошибка',
  });
});

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
