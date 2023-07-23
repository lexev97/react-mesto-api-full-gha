const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));
router.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Сеанс завершен' });
});

module.exports = router;
