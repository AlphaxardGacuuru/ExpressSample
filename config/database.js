import mongoose from "mongoose"

const Mongoose = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((res) => {
			console.log(
				`\nMONGO DB CONNECTED: ${res.connection.host.toUpperCase()}\n\n`.cyan.underline
			)
		})
		.catch((err) => {
			console.log(err)

			process.exit(1)
		})
}

export default Mongoose
