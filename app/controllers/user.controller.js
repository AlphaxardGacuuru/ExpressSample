import Controller from "./controller.js"
import asyncHandler from "express-async-handler"

import UserService from "../services/user.service.js"

import User from "../models/user.js"

const service = new UserService()

class UserController extends Controller {
	constructor() {
		super() // Call the parent constructor
	}

	/*
	 * Get All Users
	 */

	index() {
		return service.index()
	}

	/*
	 * Get One User
	 */
	show() {
		return service.show()
	}

	/*
	 * Register New User
	 */
	store() {
		return asyncHandler(async (req, res) => {
			const { name, email, password } = req.body

			let hashedPassword = await this.hash(password)

			// Create User
			const user = await User.create({
				name,
				email,
				password: hashedPassword,
			})

			res.status(201).json({
				status: "Success",
				message: `${user.name} created successfully`,
				data: {
					_id: user.id,
					name: user.name,
					email: user.email,
					token: this.generateToken(user._id),
				},
			})
		})
	}

	/*
	 * Login User
	 */
	login() {
		return asyncHandler(async (req, res) => {
			const { email, password } = req.body

			const user = await User.findOne({ email: email })

			// Check if user exists
			if (!user) {
				res.status(400).json({
					status: "Error",
					message: "User doesn't exist",
					errors: [],
				})
			}

			let passwordMatches = await this.bcryptCompare(password, user.password)

			// // Check password matches
			if (!passwordMatches) {
				res.status(400).json({
					status: "Failed",
					message: "Password doesn't match",
					errors: [],
				})
			}

			res.status(200).json({
				status: "Success",
				message: "Logged In",
				data: {
					id: user._id,
					name: user.name,
					email: user.email,
					token: this.generateToken(user._id),
				},
			})
		})
	}

	/*
	 * Get Current User details
	 */
	auth() {
		return asyncHandler(async (req, res) => {
			res.status(200).json({
				status: "Success",
				message: "Authenticated",
				data: {
					id: req.auth_id,
					name: req.auth.name,
					email: req.auth.email,
					token: req.auth.token,
				},
			})
		})
	}
}

export default UserController
