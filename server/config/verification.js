const verify = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.json({
            message: 'Could not verify user',
            authenticated: false
        })
    }
}

module.exports.verify = verify;