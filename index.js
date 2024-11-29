/** @format */

import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import consola from "consola"
import MongooseConnect from "./config/database.js"
import ErrorHandler from "./middleware/error.middleware.js"
import apiRouter from "./routes/api/index.js"

// Load environment variables from .env
dotenv.config()

MongooseConnect()

async function start() {
	const app = express()

	const HOST = process.env.BASE_URL
	const PORT = process.env.PORT

	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))

	/*
	 * Define Routes
	 */
	app.use("/api", apiRouter)

	// Should be the last middleware called
	app.use(ErrorHandler)

	// Listen the server
	app.listen(PORT, HOST, () =>
		console.log(
			`\nSERVER LISTENING ON HTTP://${HOST.toUpperCase()}:${PORT.toUpperCase()}`.green.underline
		)
	)
}

start()
