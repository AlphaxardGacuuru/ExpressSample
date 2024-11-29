import express from "express"

const app = express()

// Middleware
app.use(express.json())

// Example API route
app.get("/api/hello", (req, res) => {
	res.json({ message: "Hello from Express!" })
})

export default defineEventHandler(async (event) => {
	const req = event.node.req
	const res = event.node.res

	return new Promise((resolve) => {
		app(req, res, () => {
			resolve() // Pass control back to Nuxt if no routes match
		})
	})
})
