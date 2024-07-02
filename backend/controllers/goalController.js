const asyncHander = require("express-async-handler")

/*
 * Get All Goals
 */
const getGoals = asyncHander(async (req, res) => {
	res.status(200).json({ message: "Get goals" })
})

/*
 * Create Goal
 */
const setGoal = asyncHander(async (req, res) => {
	if (!req.body.text) {
		res.status(400)

		throw new Error("Please add a text field")
	}
	res.status(200).json({ message: "Set goal" })
})

/*
 * Update Goal
 */
const updateGoal = asyncHander(async (req, res) => {
	res.status(200).json({ message: `Update goal ${req.params.id}` })
})

/*
 * Delete Goal
 */
const deleteGoal = asyncHander(async (req, res) => {
	res.status(200).json({ message: `Delete goal ${req.params.id}` })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }
