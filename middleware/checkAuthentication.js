// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken'


export const tokenCheck = (req,res,next)=>{
//    console.log(req.headers);
    const token = req.body.token || req.query.token || req.headers['authorization']
    console.log(token)
    if(token){
        jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decoded){
            if(err){
                console.log(err)
                return res.status(401).json({"error":true,"msg":'unauthorized access'})
     }
     res.locals.jwt_user = decoded;
     console.log('going to be next')
     next()
        })
    }else{
        return res.status(401).send({
            "error":true,
            "msg":'No token Provided'
        })
    }
}