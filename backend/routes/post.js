const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const privateKey = ``;

const router = express.Router();

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      /// log the
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
    completed: req.body.completed,
  });
  return post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        _id: savedPost._id,
        title: savedPost.title,
        content: savedPost.content,
        author: savedPost.author,
        completed: savedPost.completed,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Something is went wrong." });
    });
});

router.get("/", async function (req, res, next) {
  const posts = await Post.find().where("author").equals(req.payload.id).exec();
  //const posts = await Post.find().exec();
  return res.status(200).json({ posts: posts });
});

router.get("/:id", async function (req, res, next) {
  const post = await Post.findOne().where("_id").equals(req.params.id).exec();
  //const posts = await Post.find().exec();
  return res.status(200).json(post);
});

router.delete("/:id", async function (req, res, next) {
  if(req.params.id){
    const post = await Post.findOne().where("_id").equals(req.params.id).exec();
    if(post){post.delete();}
    return res.status(200);
  }else{
    return res.status(500);
  } 
});

router.put("/:id", async function (req, res, next){
  console.log(req.params);
  if(req.params.id){
    const post = await Post.findOne().where("_id").equals(req.params.id).exec();
    console.log(post);
    if(post) {
      post.updateOne({completed: req.body.completed}, function(err, result) {
        if (err) {
          return res.status(500).json({ error: "Something is went wrong." });
        } else {
          return res.status(200).json({message: "Success."});
        }
      });
  }

  }else{
    return res.status(500).json({ error: "Something is went wrong." });
  }

});

module.exports = router;