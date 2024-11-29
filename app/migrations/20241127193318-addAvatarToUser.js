import Migration from "../config/migration.js"
import User from "../models/user.js"

class addAvatarToUserClass extends Migration {
	constructor() {
		super()
	}

	// 'up' method to add the 'isActive' field
	async up(db, client) {
		// Perform the migration operation
		await User.updateMany({}, { $set: { avatar: "/avatars" } })

		await this.mongoose.disconnect() // Properly wait for disconnection
	}

	// 'down' method to rollback the migration
	async down(db, client) {

		// Undo the migration operation
		await User.updateMany({}, { $unset: { avatar: "" } })

		await this.mongoose.disconnect()
	}
}

// Create an instance of the migration class
const addAvatarToUsers = new addAvatarToUserClass()

// Properly bind the context to the exported functions
export const up = addAvatarToUsers.up.bind(addAvatarToUsers)
export const down = addAvatarToUsers.down.bind(addAvatarToUsers)
