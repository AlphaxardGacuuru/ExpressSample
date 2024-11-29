import Resource from "./resource.js"

class UserResource extends Resource {
	constructor(value) {
		super(value)
	}

	resource(value) {
		return {
			id: value._id,
			name: value.name,
		}
	}
}

export default UserResource
