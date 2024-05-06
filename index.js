import express from "express";
import bodyParser from "body-parser";
import articleRouter from "./routes/blog.js";
import mongoose from "mongoose";
import Article from "./models/articles.js";
import methodOverride from "method-override";

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/data")

app.set("view engine", "ejs")
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(express.static("public"));


app.get("/", async (req, res) => {
  const blogs = await Article.find().sort({date: "desc"});

  res.render("partials/index.ejs",{
    articles: blogs
  });
  });
  app.use("/blog",articleRouter);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });