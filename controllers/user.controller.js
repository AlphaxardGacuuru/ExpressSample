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
		return service.store()
	}

	/*
	 * Login User
	 */
	login() {
		return service.login()
	}

	/*
	 * Get Current User details
	 */
	auth() {
		return service.auth()
	}
}

export default UserController
