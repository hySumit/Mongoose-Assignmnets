const jwt = require('jsonwebtoken')

const auth = async (req,res,next) =>{
    // console.log(auth);
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);

    if(token){
        jwt.verify(token, 'secretKey', function(err, decoded) {
            console.log(decoded) 
            req.body.userID = decoded.userID
            req.body.username = decoded.username
            next()
          });
    }else{
        res.status(401).json({
            message:"Token not found, please login"
        })
    }
}


module.exports = auth