const verify = (req, res, next) => {
    if(req.authenticated){
        next();
    } else {
        res.json({
            message: 'Could not verify user'
        })
    }
}

module.exports.verify = verify;