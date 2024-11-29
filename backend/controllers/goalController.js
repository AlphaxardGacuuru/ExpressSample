const asyncHander = require("express-async-handler")

const Goal = require("../models/goalModel")
const User = require("../models/userModel")

/*
 * Get All Goals
 */
const getGoals = asyncHander(async (req, res) => {
	const goals = await Goal.find({user: req.user.id})

	res.status(200).json(goals)
})

/*
 * Create Goal
 */
const setGoal = asyncHander(async (req, res) => {
	if (!req.body.text) {
		res.status(400)

		throw new Error("Please add a text field")
	}

	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id
	})

	res.status(200).json(goal)
})

/*
 * Update Goal
 */
const updateGoal = asyncHander(async (req, res) => {
	const goal = await Goal.findById(req.params.id)

	if (!goal) {
		res.status(404)

		throw new Error("Goal not found")
	}
	
	const user = await User.findById(req.user.id)

	// Check for User
	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	// Make sure the logged in User matched the Goal User
	if (goal.user.toString() !== user.id) {
		res.status(401)
		throw new Error("User not Authorized")
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})

	res.status(200).json(updatedGoal)
})

/*
 * Delete Goal
 */
const deleteGoal = asyncHander(async (req, res) => {
	const goal = await Goal.findById(req.params.id)

	if (!goal) {
		res.status(404)

		throw new Error("Goal not found")
	}

	const user = await User.findById(req.user.id)

	// Check for User
	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	// Make sure the logged in User matched the Goal User
	if (goal.user.toString() !== user.id) {
		res.status(401)
		throw new Error("User not Authorized")
	}

	goal.remove()

	res.status(200).json({
		id: req.params.id,
		message: `Goal ${goal.id} deleted`,
	})
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }
