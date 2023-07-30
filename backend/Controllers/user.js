const BigPromise = require("../Middlewares/BigPromise");
const User = require("../Models/User");
const { CookieToken } = require("../utils/Cookie");
const { getUriData } = require("../utils/DataUri");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary=require("cloudinary")

exports.registerUser=BigPromise(async(req,res,next)=>{
    const { name, email, password } = req.body;
  const file = req.file;
  console.log(name,email,password,file);


  if (!name || !email || !password || !file) {
    return next(new ErrorHandler("Please add all feilds", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("Account already exists", 409));
  }

  const fileUri = getUriData(file);
 

  const result = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "Blog/Users",
    width: 150,
    crop: "scale",
  });

  user = await User.create({
    name,
    email,
    password,
    avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    
  });

  CookieToken(res, user, `${user.name} Registred Successfully`, 201);
    
})

exports.loginUser=BigPromise(async(req,res,next)=>{
    const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please add all feilds", 400));
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Please create a Account first", 400));
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Incorrect Email or password", 400));
  }

  CookieToken(res, user, `Welcome back,${user.name}`, 200);
 
})
exports.logoutUser = BigPromise(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure:true,
        sameSite:"none"
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  });
  
  exports.getMyProfile = BigPromise(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    if (!user) {
      return next(new ErrorHandler("unauthorized", 401));
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
