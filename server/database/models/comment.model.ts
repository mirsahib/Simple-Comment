import {model,Model,Schema,Document} from 'mongoose'

export interface IComment extends Document{
    text:string,
    commentId:string,
    replyId:string,
    type:string,
    userId:string
}

const CommentSchema = new Schema<IComment>({
    text:{type:String,trim:true},
    commentId:{type:String,trim:true},
    replyId:{type:String,trim:true},
    type:{type:String,enum:['comment','reply'],default:'comment'},
    userId: {type:String}
})

const Comment:Model<IComment> = model<IComment>('Comment',CommentSchema)

export default Comment