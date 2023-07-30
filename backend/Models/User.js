const mongoose=require('mongoose')
const validator = require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const userSchema=new mongoose.Schema({
   
    name:{
        type:String,
        required:[true,'Please enter a name'],
        trim:true

    },
    email:{
        type:String,
        required:[true,'Please enter a Email'],
        unique:true,
        validate:validator.isEmail,
        trim:true

    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minLength:[6,'Password must be at least 6 characters'],
        select:false,

    },
 
    avatar:{
        public_id:{
            type:String,
            required:true

        },
        url:{
            type:String,
            required:true
        }
        
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },




})

userSchema.pre('save', async function(next){
 
    if(!this.isModified('password')){
        return next()
    }


   this.password=await bcrypt.hash(this.password,10)
   next()

 })

userSchema.methods.getJWTToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })

}
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)

}

module.exports=mongoose.model('User', userSchema)