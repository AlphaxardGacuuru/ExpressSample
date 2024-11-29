import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate"

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add a email"],
			unique: [true, "Email Already Exists"],
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
		isActive: {
			type: Boolean
		}
	},
	{
		timestamps: true,
	}
)

UserSchema.plugin(mongoosePaginate)

export default mongoose.model("User", UserSchema)
