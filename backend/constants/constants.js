const linkRegex = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/;
const allowedCors = [
  'https://place.nomoredomains.xyz',
  'http://place.nomoredomains.xyz',
  'localhost:3000',
];

module.exports = {
  linkRegex,
  allowedCors,
};
