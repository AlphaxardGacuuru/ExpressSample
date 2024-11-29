import Service from "./service.js"
import asyncHandler from "express-async-handler"

import User from "../models/user.js"
import UserResource from "../resources/user.resource.js"

class UserService extends Service {
	constructor() {
		super()
	}

	/*
	 * Get All Users
	 */

	index() {
		return asyncHandler(async (req, res) => {
			// const users = await User.find({})
			const users = await User.paginate({}, { page: 3 })

			const data = new UserResource(users)

			// return users
			res.status(201).json({
				status: "Success",
				message: `${data.total} users`,
				data: data,
			})
		})
	}

	/*
	 * Get One User
	 */
	show() {
		return asyncHandler(async (req, res) => {
			const user = await User.findById(req.params.id).lean()

			const data = new UserResource(user)

			res.status(200).json({
				status: "Success",
				message: "1 user",
				data: data,
			})
		})
	}

	/*
	 * Register New User
	 */
	store() {
		return asyncHandler(async (req, res) => {
			const { name, email, password } = req.body

			let hashedPassword = await this.hash(password)

			// Start a database session
			const session = await User.startSession()
			session.startTransaction() // Begin transaction

			try {
				// Create the first user
				const user = await User.create(
					[
						{
							name,
							email,
							password: hashedPassword,
						},
					],
					{ session }
				)

				// Create the second user
				const user2 = await User.create(
					[
						{
							name: `${name}2`,
							email: `${email}`,
							password: hashedPassword,
						},
					],
					{ session }
				)

				// Commit the transaction
				await session.commitTransaction()
				session.endSession()

				res.status(201).json({
					status: "Success",
					message: `${user[0].name}, ${user2[0].name} created successfully`,
					data: [user[0], user2[0]],
				})
			} catch (error) {
				// Rollback the transaction in case of an error
				await session.abortTransaction()
				session.endSession()

				res.status(500).json({
					status: "Failed",
					message: "An error occurred during user creation",
					error: error.message,
				})
			}
		})
	}

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

	auth() {
		return asyncHandler(async (req, res) => {
			res.status(200).json({
				status: "Success",
				message: "Authenticated",
				data: {
					id: req.auth._id,
					name: req.auth.name,
					email: req.auth.email,
					token: req.auth.token,
				},
			})
		})
	}
}

export default UserService
