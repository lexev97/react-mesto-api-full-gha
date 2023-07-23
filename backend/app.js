require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsHandler } = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');
const { linkRegex } = require('./constants/constants');
const {
  SERVER_ERROR,
  BAD_REQUEST,
  CONFLICT,
} = require('./errors/statusCodes');
const { login, addUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, MONGOOSE_DB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGOOSE_DB);
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
}));
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use(limiter);
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

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
 });
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

app.listen(PORT);
