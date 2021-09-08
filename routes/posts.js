const express = require("express")
const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    // Create a new post
  } catch (err) {
    next(err)
  }
})

router.get("/", async (req, res, next) => {
    try {
      // list all posts
    } catch (err) {
      next(err)
    }
})

router.get("/:postId", async (req, res, next) => {
    try {
      // fetch single post
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
