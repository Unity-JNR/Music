import {config} from 'dotenv'
import bcrypt from 'bcrypt'
// import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { checkuser,loggeduser } from '../models/database.js'

config()

const authenticate=(req,res,next)=>{
    let {cookie}= req.headers
    let tokenInHeader=cookie && cookie.split('=')[1]

    if(tokenInHeader===null) res.sendStatus(401)

    jwt.verify(tokenInHeader,process.env.SECRET_KEY,(err,user)=>{
 

        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}
 

const auth=async(req,res,next)=>{
    const {userPass,userName}=req.body
    const hashedPassword=await checkuser(userName)
    let thisUser = await getusername(userName)
    bcrypt.compare(userPass,hashedPassword,(err,result)=>{

        if(err) throw err
        if(result === true){
            const {userName}=req.body

            const token=jwt.sign({userName:userName},process.env.SECRET_KEY,{expiresIn:'1h'})
            res.cookie('jwt',token,thisUser,{httpOnly:true,secure:true,sameSite:'none',maxAge:3600000})

            res.send({
                token:token,
                msg:'i have logged in!!! YAY!!!',
                user:thisUser
            })
            next()
        }else{
            res.send({msg:'The userName or password is incorrect'})
        }
    })
}


export{
    auth,authenticate
}