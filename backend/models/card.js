const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^https?:\/\/(www\.)?[\w-]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/gi;
        return regex.test(v);
      },
      message: 'Неправильная ссылка',
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('card', cardSchema);
