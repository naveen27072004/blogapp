const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    title:String,
    file:String,
    email:String
})
const postmodule=mongoose.model('posts',postSchema)
module.exports=postmodule