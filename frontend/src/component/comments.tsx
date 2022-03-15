import { useEffect, useState } from "react"
import {getComments as getCommentsApi} from "../api"
import Comment from './comment'

interface CommentsProps{
    currentUserId:string
}

export interface IComments{
    id:string,
    body: string,
    username: string,
    userId: string,
    parentId: string|null,
    createdAt: string,
}

function Comments({currentUserId}:CommentsProps){
    const [backendComments,setBackendComments] = useState<IComments[]>([])
    useEffect(()=>{
        getCommentsApi().then(data=>{
            setBackendComments(data)
        })
    },[])

    const rootComments = backendComments.filter(item=>{
        return item.parentId===null
    })

    const getReplise = (commentId:string)=>{
        return backendComments.filter(item=>{
            return item.parentId===commentId
        }).sort((a,b)=>{
            return new Date(a.createdAt).getTime()- new Date(b.createdAt).getTime()
        })
    }

    return (
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comments-container">
                {
                    rootComments.map(item=>{
                        return(
                            <Comment key={item.id} commentBody={item} replies={getReplise(item.id)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Comments