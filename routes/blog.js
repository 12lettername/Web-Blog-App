import express from "express";
import Article from "./../models/articles.js";

const router = express.Router()

router.get("/new",(req,res) => {
    res.render("partials/new", {article: new Article()})
})

router.get("/edit/:id", async (req,res) =>{
  const article = await Article.findById(req.params.id)
  res.render("partials/edit",{article: article})
})

router.get("/:slug", async (req,res) => {
   const article = await Article.findOne({slug:
    req.params.slug
   })
   if(article == null) res.redirect("/")
   res.render("partials/show",{article: article})
})

router.post("/", async (req,res,next) =>{
req.article = new Article()
next()
}, saveArticleAndRedirect("new"))

router.put("/:id", async (req,res,next) =>{
 req.article = await Article.findById(req.params.id)
 next()
}, saveArticleAndRedirect("edit"))

router.delete("/:id", async (req,res) =>{
  await Article.findByIdAndDelete(req.params.id)
  res.redirect("/")

})

function saveArticleAndRedirect(path) {
  return async  (req,res) =>{
    let article = req.article
    article.name = req.body.name
    article.title = req.body.title
    article.description = req.body.description
   try {
     article = await article.save()
     res.redirect(`/blog/${article.slug}`)
   } catch (e) {
     console.log(e)
     res.render(`partials/${path}`, {article: article})
   }
  }
}

export default router;

