const jwt = require('jsonwebtoken');
const secretKey = require('../config/jwtConfig');

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    }

    return jwt.sign(payload, secretKey, {expiresIn: "1000h"});
}

module.exports = generateToken;

