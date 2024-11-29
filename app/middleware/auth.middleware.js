import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/user.js"

const auth = asyncHandler(async (req, res, next) => {
	console.log("req", req)
	let authHeader = req.headers.authorization
	let token

	var hasBearerToken = authHeader && authHeader.startsWith("Bearer")

	if (hasBearerToken) {
		try {
			// Get Token from Header
			token = authHeader.split(" ")[1]

			// Verify Token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.auth = await User.findById(decoded.id).select("-password")
			req.auth.token = token

			next()
		} catch (error) {
			console.log(error)
			res.status(401)
			throw new Error("Not Authorized")
		}
	}

	if (!token) {
		res.status(401)
		throw new Error("Not Authorized, No token")
	}
})

export default auth
