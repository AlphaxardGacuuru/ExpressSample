import asyncHandler from "express-async-handler"

const ErrorHandler = asyncHandler(async (err, req, res, next) => {
	const statusCode = res.statusCode || 500

	res.status(statusCode).json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	})
	next()
})

export default ErrorHandler
