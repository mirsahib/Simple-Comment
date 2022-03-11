import{Express,Request,Response} from 'express'
import { IComment } from '../../database/models/comment.model'
import Comment from '../../database/models/comment.model'
import CommentService from '../service/comment.service'
import passport from 'passport'

class CommentApi{
    app:Express
    commentService:CommentService

    constructor(app:Express){
        this.app = app
        this.commentService = new CommentService()

        this.initializeRoute()
    }

    initializeRoute(){
        // create comment
        this.app.post('/api/comment', passport.authenticate('jwt',{session:false}),async (req:Request,res:Response)=>{
            const reqBody:Partial<IComment> = req.body as unknown as IComment
            const comment = new Comment(reqBody)
            comment.userId = req.user as unknown as string
            await comment.save()
            res.json(comment)
        })
        this.app.post('/api/reply',passport.authenticate('jwt',{session:false}),async(req:Request,res:Response)=>{
            const reqBody:Partial<IComment> = req.body as unknown as IComment
            reqBody.commentId = req.query.commentId as unknown as string
            reqBody.type = 'reply'
            reqBody.userId = req.user as unknown as string
            const reply = new Comment(reqBody)
            await reply.save()
            res.json(reply)
        })

    }
}

export default CommentApi