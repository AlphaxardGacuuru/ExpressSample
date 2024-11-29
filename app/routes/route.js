import { Router } from "express"
import AuthMiddleware from "../middleware/auth.middleware.js"

export default class Route {
	constructor() {
		this.router = Router() // Create a new Router instance
		this.authMiddleware = AuthMiddleware
	}

	// Shared validation middleware
	validate(validations) {
		return async (req, res, next) => {
			let validationResults = await Promise.all(
				validations.map(async (validation) => {
					const result = await validation.run(req)

					if (!result?.isEmpty()) {
						return result.array().map((error) => ({
							field: error.path,
							message: error.msg,
						}))
					}
				})
			)

			// Filter out null values
			validationResults = validationResults.filter(
				(validationResult) => validationResult
			)

			if (validationResults.length > 0) {
				res.status(400).json({
					status: "Failed",
					message: "Validation Error",
					errors: validationResults.flat(), // Flatten the array of error arrays
				})
				return
			}

			next() // Proceed to the next middleware if validation passes
		}
	}
}
