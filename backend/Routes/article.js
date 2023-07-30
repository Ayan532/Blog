const express=require('express')
const router=express.Router()
const Article=require('../Controllers/article')
const { isAuthenticated } = require('../Middlewares/isAuthenticated')
const { singleupload } = require('../Middlewares/Multer')


router.route('/').get(Article.getArticles)
router.route('/:id').get(Article.getArticlesByID)
router.route('/create').post(isAuthenticated,singleupload,Article.createArticles)
router.route('/edit/:id').put(isAuthenticated,singleupload,Article.editArticles)
router.route('/delete/:id').delete(isAuthenticated,Article.deleteArticle)


router.route('/comment/add/:id').post(isAuthenticated,Article.addComments)


module.exports=router