const mongoose=require('mongoose')

const articleSchema=new mongoose.Schema({
   
    title:{
        type:String,
        required:[true,'Please enter a Article Title'],
        minLength:[4,'Title must be at least 4 characters'],
        maxLength:[80,'Title must be at most 80 characters'],
        
    },
    description:{
        type:String,
        required:[true,'Please enter a Article Description'],
        minLength:[20,'Title must be at least 20 characters'],
        

    },
    comments:[
        {
            comment:{
                type:String,
            },
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    poster:{
        public_id:{
            type:String,
            //required:true

        },
        url:{
            type:String,
            //required:true
        }

    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },

    createdBy:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }




})

module.exports=mongoose.model('Article', articleSchema)