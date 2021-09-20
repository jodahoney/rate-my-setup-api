const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Post {
    static async listPosts() {
        // List all posts in db in desceding order of when they were created
        const results = await db.query(
            `
            SELECT p.id,
                    p.caption,
                    p.image_url AS "imageUrl",
                    p.user_id AS "userId",
                    u.email AS "userEmail",
                    p.created_at AS "createdAt",
                    p.updated_at AS "updatedAt"
            FROM posts AS p
                JOIN users AS u ON u.id = p.user_id
            ORDER BY p.created_at DESC
            `
        )

        return results.rows
    }

    static async fetchPostById(postId) {
        // Fetch a single post
        const results = await db.query(
            `
            SELECT p.id,
                    p.caption,
                    p.image_url AS "imageUrl",
                    p.user_id AS "userId",
                    u.email AS "userEmail",
                    p.created_at AS "createdAt",
                    p.updated_at AS "updatedAt"
            FROM posts AS p
                JOIN users AS u ON u.id = p.user_id
            WHERE p.id = $1
            `, [postId]
        )

        const post = results.rows[0]
        if (!post) {
            throw new NotFoundError()
        }

        return post
    }

    static async createNewPost({ post, user }) {
        // Create a new post
        const requiredFields = ["caption", "imageUrl"]
        requiredFields.forEach(field => {
            if (!post.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body`)
            }
        })

        if (post.caption.length > 140) {
            throw new BadRequestError(`Post caption must be 140 characters or less.`)
        }

        // Note that for the query we have to do a subquery to get the id based off the email
        // because from the token the only info we have is the users email, not their id.
        // this is an important design choice to keep in mind of what info gets encoded
        const results = await db.query(
            `
            INSERT INTO posts (caption, image_url, user_id)
            VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))
            RETURNING id, 
                        caption,
                        image_url AS "imageUrl",
                        user_id AS "userId",
                        created_at AS "createdAt",
                        updated_at AS "updatedAt"
            `, [post.caption, post.imageUrl, user.email]
        )
        return results.rows[0]
    }

    static async editPost({ postId, postUpdate }) {
        // Edit a single post
    }
}

module.exports = Post