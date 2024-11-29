import mongoose from "mongoose"

const MONGO_URI =
	"mongodb+srv://AlphaxardG:vY2s3YLcntVkcTh4@al.dam7d9p.mongodb.net/black_money?retryWrites=true&w=majority&appName=Al"

class Migration {
	constructor() {
		this.mongoose = mongoose
		this.connect()
	}

	connect() {
		mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
	}
}

export default Migration
