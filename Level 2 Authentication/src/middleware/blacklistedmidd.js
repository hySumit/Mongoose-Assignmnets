const blackListedToken = require("../model/blacklisted.model")

const blacklistMiddleware = async (req, res, next) => {
    // Getting the token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        // cheaking if the token exists in the blacklist
        const blacklistedToken = await blackListedToken.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }
    }

    next();
};

module.exports = blacklistMiddleware;
