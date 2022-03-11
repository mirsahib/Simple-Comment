import {model,Model,Document,Schema} from 'mongoose'


export interface IUser extends Document {
    userName:string,
    password:string
}

const UserSchema:Schema = new Schema<IUser>({
    userName:{type:String},
    password:{type:String}
})

const User:Model<IUser> = model('User',UserSchema)

export default User