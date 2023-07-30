const connectWithDb = require('./Config/dbConnect')
const app= require('./app')

const cloudinary=require('cloudinary')


connectWithDb()


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})






app.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})

