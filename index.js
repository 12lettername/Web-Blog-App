import express from "express";
import bodyParser from "body-parser";
import articleRouter from "./routes/blog.js";
import mongoose from "mongoose";
import Article from "./models/articles.js";
import methodOverride from "method-override";
import { MongoClient,ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://aryanneogi:aryan123@blog-app.z6dxj9x.mongodb.net/?retryWrites=true&w=majority&appName=blog-app";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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