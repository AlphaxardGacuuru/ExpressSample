import asyncHander from "express-async-handler"

// const Account = require("../models/AccountModel")
// const User = require("../models/userModel")

/*
 * Get All Accounts
 */
const index = asyncHander(async (req, res) => {
	// const Accounts = await Account.find({user: req.user.id})

	// res.status(200).json(accounts)
	res.status(200).json({ message: "You hit accounts" })
})

export default {
	index,
	// show,
	// store,
	// update,
	// destory,
}
