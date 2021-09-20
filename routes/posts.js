const express = require("express")
const Post = require("../models/post")
const security = require("../middleware/security")
const router = express.Router()

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    // Create a new post
    const { user } = res.locals
    const post = await Post.createNewPost({ user, post: req.body })
    return res.status(201).json({ post })
  } catch (err) {
    next(err)
  }
})

router.get("/", async (req, res, next) => {
    try {
      // list all posts
      const posts = await Post.listPosts()
      return res.status(200).json({ posts })
    } catch (err) {
      next(err)
    }
})

router.get("/:postId", async (req, res, next) => {
    try {
      // fetch single post
      const { postId } = req.params
      const post = await Post.fetchPostById(postId)
      return res.status(200).json({ post })
    } catch (err) {
      next(err)
    }
})

router.put("/:postId", async (req, res, next) => {
    try {
      // update a single post
    } catch (err) {
      next(err)
    }
})

router.post("/:postId/ratings", async (req, res, next) => {
    try {
      // create a rating for a post
    } catch (err) {
      next(err)
    }
})
module.exports = router
