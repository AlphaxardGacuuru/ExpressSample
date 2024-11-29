import Validator from "./validator.js"
import { body } from "express-validator"
import User from "../models/user.js"

class UserValidator extends Validator {
	constructor() {
		super()
	}

	store() {
		let name = body("name").notEmpty().withMessage("Name is requried")

		let email = body("email")
			.isString()
			.withMessage("Must be a string")
			.notEmpty()
			.withMessage("Email is required")
			.custom(async (value) => {
				const user = await User.findOne({ email: value })

				if (user) {
					throw new Error("E-mail already exists!")
				}
			})

		let password = body("password").notEmpty().withMessage("Password is required")

		let passwordConfirmation = body("passwordConfirmation")
			.notEmpty()
			.withMessage("Password Confirmation is required")
			.custom((value, { req }) => {
				if (value != req.body.password) {
					throw new Error("Password Confirmation doesn't match")
				} else {
					return true
				}
			})

		return [name, email, password, passwordConfirmation]
	}

	login() {
		let email = body("email")
			.isString()
			.withMessage("Must be a string")
			.notEmpty()
			.withMessage("Email is required")

		let password = body("password").notEmpty().withMessage("Password is required")

		return [email, password]
	}
}

export default UserValidator
