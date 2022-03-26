const jwt = require('jsonwebtoken');

const generateToken = (id, username, isAdmin) => {
    return jwt.sign(
        {id, username, isAdmin},
        process.env.SECRET_KEY,
        {expiresIn: process.env.SESSION_TIMEOUT}
    )
}

module.exports = generateToken;