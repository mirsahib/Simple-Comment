import express from 'express'
import connection from './database/connection'
import Auth from './src/api/auth.api'
import UserApi from './src/api/user.api'
import passport from 'passport'
import applyPassportStrategy from './src/middleware/passport'
import CommentApi from './src/api/comment.api'

const Server =async ()=>{

    const app = express()
    app.use(express.json())
    applyPassportStrategy(passport)

    await connection()

    //register api
    new UserApi(app)
    new Auth(app)
    new CommentApi(app)

    app.listen(3000,()=>{
        console.log('App started at port',3000)
    }) 
}

Server()