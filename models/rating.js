const db = require("../db")

class Rating {
    static async fetchRatingForPostByUser({ user, postId }) {
        // fetch a users' rating for a post, if one exists
    }

    static async createRatingForPost({ rating, user, postId }) {
        // check if user has already added a rating for this post
        // Throw an error if they have
        // otherwise insert record into db
    }
}

module.exports = Rating