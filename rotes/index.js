const Router = require('express');
const router = new Router();
const User = require('./user/index');
const Portal = require('./portal/index');
const { protect, admin } = require('../middleware/authUserMiddleware');

router.use('/user', User)
router.use('/portal', protect, admin, Portal);


module.exports = router;