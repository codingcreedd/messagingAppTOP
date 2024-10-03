const jwt = require('jsonwebtoken');
const secretKey = require('../config/jwtConfig');

const verify = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if(!authHeader) {
        return res.status(401).json({message: "Unauthorized: Missing Token"});
    }

    const [bearer, token] = authHeader.split(" ");
    if(bearer !== "Bearer" || !token) {
        return res.status(401).json({message: "Invalid token format"})
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err) {
            return res.status(403).json({message: 'Forbidden: Invalid Token'});
        }

        req.user = user;
        console.log(req.user);
        next();
    })
}

module.exports.verify = verify;