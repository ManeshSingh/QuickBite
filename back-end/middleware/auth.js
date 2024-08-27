import jwt from 'jsonwebtoken'
import 'dotenv/config'



// this middleware just take the token and convert it into userId. with this userId, we can add, remove or get the cart data
const authMiddleware = async (req,res,next) => {

    const {token} = req.headers;
    if(!token){
        return res.json({
            success: false,
            message: "Not Authorized Please Login again"
        })
    }

    try {
        // now decoding the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // when we decode the token, we will get the 'id' back that we have used when we created the token
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        return res,json({
            success: false,
            message: "Error"
        })
    }

}

export default authMiddleware;