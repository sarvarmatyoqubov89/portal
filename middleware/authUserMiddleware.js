const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');

const protect = asyncHandler (async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = await User.findById(decoded.id).select('-password');

            next()
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Ruxsat berilmagan');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Ruxsat berilmagan, Token mavjud emas')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Adminlik huquqi mavjud emas')
    }
}

module.exports = { protect, admin }