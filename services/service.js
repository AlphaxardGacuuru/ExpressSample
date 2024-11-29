import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

class Service {
	constructor() {
		this.mongoose = mongoose
	}

	/*
	 * Generate Token
	 */
	generateToken(id) {
		return jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: "30d",
		})
	}

	/*
	 * Hash
	 */
	async hash(value) {
		const salt = await bcrypt.genSalt(10)
		let hash = await bcrypt.hash(value, salt)

		return hash
	}

	/*
	 * Password Matches
	 */
	async bcryptCompare(value1, value2) {
		let comparison = await bcrypt.compare(value1, value2)

		return comparison
	}
}

export default Service
