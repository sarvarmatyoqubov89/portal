const Router = require('express');
const router = new Router();
const User = require('./user/index');
const Portal = require('./portal/index');

router.use('/user', User)
router.use('/portal', Portal);


module.exports = router;