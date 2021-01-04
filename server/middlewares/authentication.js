const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    
    const token = req.header('jwt-token')

    if(!token){
        return res.status(401).json({
            msg: 'You have to login, first!'
        })
    }

    //verify
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //set user id in req.user
        req.user = decoded.user
        next()

    } catch (error) {
        req.status(401).json({
            msg: 'token is not valid'
        })
    }

}