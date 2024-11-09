import JWT from 'jsonwebtoken';

export const checkToken = async(req,res,next) =>{
    const token = req.cookies.JWT;

    if(!token){
        res.status(401).json({msg:'user are not authorized'})
    }else{
        const user = JWT.verify(token , process.env.JWT_SECRETE_KEY  )
        req.user = user;
        next();
    }
}