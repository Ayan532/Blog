const BigPromise = require("../Middlewares/BigPromise");
const Articles = require("../Models/Articles");
const User = require("../Models/User");
const { getUriData } = require("../utils/DataUri");
const cloudinary=require('cloudinary')

exports.createArticles=BigPromise(async(req,res)=>{
    const {title,description}=req.body
    const file=req.file
    
    if(!title || !description || !file)  return next(new ErrorHandler("Please add all feilds", 400));

   
    const user=await User.findById(req.user._id)
    
    const fileUri = getUriData(file);
 

    const result = await cloudinary.v2.uploader.upload(fileUri.content, {
      folder: "Blog/Articles",
    });


    const createdBy=user.name;



  const article=await Articles.create({
        title,
        description,
        user:req.user._id,
        createdBy,
        poster:{
            public_id: result.public_id,
        url: result.secure_url,
        }
    })

 

    res.status(201).json({
        success: true,
        message:"Article created successfully",
    })
})

exports.getArticles=BigPromise(async(req,res)=>{
    const keyword = req.query.keyword || "";
   const articles=await Articles.find({
    title: {
            $regex: keyword,
            $options: "i",
          },
   }).populate("comments.user") 

    res.status(201).json({
        success: true,
        articles
    })
})
exports.getArticlesByID=BigPromise(async(req,res)=>{
   const article=await Articles.findById(req.params.id).populate("user")
    res.status(201).json({
        success: true,
        article
    })
})

exports.editArticles=BigPromise(async(req,res)=>{
   const {title,description}=req.body
   const file=req.file
 
   const article=await Articles.findById(req.params.id)
   
   let result;
   if(!article) return next(new ErrorHandler("No Article Found", 404))
   if(file){
    const fileUri = getUriData(file);
    result=await cloudinary.v2.uploader.upload(fileUri.content, {
        folder: "Blog/Articles",
      });
      await cloudinary.v2.uploader.destroy(article.poster.public_id)
   }
  
   title && (article.title=title)
   description && (article.description=description)
 
   file && (article.poster={
    public_id: result.public_id,
url: result.secure_url,
})
   
  await article.save()
   res.status(201).json({
    success:true,
    message:`Article Edited Successfully`
   })
})

exports.addComments=BigPromise(async(req,res)=>{
     
    const {comment}=req.body;
    console.log(comment,req.params.id);
    let  article=await Articles.findById(req.params.id)
    if(!article) return next(new ErrorHandler("No Article Found", 404))
   
    article.comments.push({
        comment,
        user:req.user._id
    })

    await article.save()

    res.status(200).json({
        success: true,
        message:"Comment Added successfully"
    })


})

exports.deleteArticle=BigPromise(async(req,res)=>{
    const article=await Articles.findById(req.params.id)
    console.log(article);

    if(!article) return next(new ErrorHandler("No Article Found", 404))
    const articleId=article._id
    await cloudinary.v2.uploader.destroy(article.poster.public_id)


    await article.deleteOne()

    res.status(201).json({
        success:true,
        message:`Article Removed Successfully`,
        articleId
       })


})
