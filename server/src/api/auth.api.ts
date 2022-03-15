import {Express,Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../../database/models/user.model'

class Auth{
    app:Express

    constructor(app:Express){
        this.app = app

        this.initializeRoute()
    }

    initializeRoute(){
        this.app.post('/api/signin',async(req:Request,res:Response)=>{
            const reqBody:Partial<IUser> = req.body as unknown as IUser
            // check if user exist and pass is correct
            const userExist:IUser|null = await User.findOne({userName:reqBody.userName})
            const dbpass = userExist?.password
            if(userExist){
                if(dbpass!=reqBody.password){
                    res.json("password doesn't match")
                    return
                }
                const token = this.generateToken(userExist)
                res.json({user:userExist._id,token:token})
            }else{
                res.json("user doesn't exist")
            }

        })
    }

    generateToken(user:IUser){
        return jwt.sign({
            sub:user._id,exp:Date.now()
        },'1234567')
    }
}

export default Auth