import express,{Express,Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../../database/models/user.model'

class UserApi{
    app:Express

    constructor(app:Express){
        this.app = app

        this.initializeRoute()
    }

    initializeRoute(){
        this.app.post('/api/register',async (req:Request,res:Response)=>{
            const {userName,password} = req.body
            const newUser = new User({userName,password})
            await newUser.save()
            const token = this.generateToken(newUser)
            res.status(200).json({token:token})
        })

    }


    generateToken(user:IUser){
        return jwt.sign({
            sub:user._id,exp:Date.now()
        },'1234567')
    }
}

export default UserApi