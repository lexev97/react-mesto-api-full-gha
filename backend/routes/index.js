const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

module.exports = router;
