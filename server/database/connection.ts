import mongoose from 'mongoose'

const connection = async () => {
    try {
       const mongo = await mongoose.connect('mongodb://root:rootpassword@localhost:27017') 
       if(mongo){
            console.log('Database connected')
       }
    } catch (error) {
        console.log(error)
    }
}
export default connection