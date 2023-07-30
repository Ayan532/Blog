const express= require('express')
require('dotenv').config({ path: './Config/config.env' })
const cookieParser= require('cookie-parser')
const ErrorMiddleware = require('./Middlewares/ErrorMiddleware')
const cors=require('cors')
const app = express()

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET', 'POST','PUT','DELETE']
    
}))






//All Routes Import
const user=require('./Routes/user')
const article=require('./Routes/article')




app.use('/api/v1/users',user)
app.use('/api/v1/article',article)



module.exports=app


app.use(ErrorMiddleware)
