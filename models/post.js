const db = require("../db")

class Post {
    static async listPosts() {
        // List all posts in db in desceding order of when they were created
    }

    static async fetchPostById(postId) {
        // Fetch a single post
    }

    static async createNewPost({ post, user }) {
        // Create a new post
    }

    static async editPost({ postId, postUpdate }) {
        // Edit a single post
    }
}

module.exports = Post