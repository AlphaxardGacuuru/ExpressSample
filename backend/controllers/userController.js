const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")

/*
 * Register New User
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		res.status(400)

		throw new Error("Please add all fields")
	}

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)

		throw new Error("User already exists")
	}

	// Hash Password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// Create User
	const user = User.create({
		name,
		email,
		password: hashedPassword,
	})

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
		})
	} else {
		res.status(400)

		throw new Error("Invalid user data")
	}
})

/*
 * Login User
 */
const loginUser = asyncHandler(async (req, res) => {
	res.json({ message: "Login User" })
})

/*
 * Get User
 */
const getMe = asyncHandler(async (req, res) => {
	res.json({ message: "Ger User" })
})

module.exports = { registerUser, loginUser, getMe }
