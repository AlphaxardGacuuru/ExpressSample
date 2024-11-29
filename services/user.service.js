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
}

export default UserService
