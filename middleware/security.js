const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")

// create a function to extract the JWT from the request header
const jwtFrom = ({ headers }) => {
    if (headers?.authorization) {
        // Authorization: "Bearer as;ldkjfa;sldkjf" - so we split it at the space
        const [scheme, token] = headers.authorization.split(" ")
        if (scheme.trim() === "Bearer") {
            return token
        }
    }
    return undefined
}

// create a function to attach the user to the res object
const extractUserFromJwt = (req, res, next) => {
    try {
        const token = jwtFrom(req)
        if (token) {
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }
    } catch(err) {
        return next()
    }
}


// create a function to verify an authed user exists
const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals
        if(!user?.email) {
            throw new UnauthorizedError()
        }
    } catch(err) {
        return next(err)
    }
}

modules.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser,
}