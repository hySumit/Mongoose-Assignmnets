const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    
    if(token){
        jwt.verify(token, process.env.secretKey, function(err, decoded) {
            console.log(decoded)
            req.body.username = decoded.username
            req.body.userID = decoded.userID
            next()
          });
    }else{
        res.status(401).json({
            message: "Token not Found please login",
          });
    }
}

module.exports = auth