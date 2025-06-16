const jwt = require('jsonwebtoken')
const UserSchema = require('../Model/UserModel.js')

exports.isAuth = async (req, res, next) => {
    try {
        // const { token } = req.cookies

        // if (!token) {
        //     return res.status(401).json({ message: 'Please Login To Access This Resource' });
        // }

        let token;

        // Get token from Authorization header: Bearer token_here
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await UserSchema.findById(decoded.id)

        next()

    } catch (error) {
        res.status(500).json({ message: 'isAuthentication', error })
    }
}


exports.authRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role: ${req.user?.role || 'Unknown'} is not allowed to access this resource`
            });
        }
        next();
    }
}



