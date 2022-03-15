import { IComments } from './comments'

interface CommentsProps{
    commentBody:IComments
    replies:IComments[]
}

function Comment({commentBody,replies}:CommentsProps){
    return(
        <div className='comment'>
            <div className="comment-image-container">
                <img src="/user-icon.png" alt="" />
            </div>
            <div className='comment-right-part'>
                <div className="comment-content">
                    <div className="comment-author">
                        {commentBody.username}
                    </div>
                    <div>{commentBody.createdAt}</div>
                </div>
                <div className="comment-text">
                {commentBody.body}
                </div>
                {replies.length >0 && (
                    replies.map(reply=>{
                        return (
                            <Comment key={reply.id} commentBody={reply} replies={[]}/>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Comment