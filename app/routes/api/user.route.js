import Route from "../route.js" // Import the parent class

import UserController from "../../controllers/user.controller.js"
import UserValidator from "../../validators/user.validator.js"

const userController = new UserController()
const userValidator = new UserValidator()

class UserRoute extends Route {
	constructor() {
		super() // Call the parent constructor
		this.routes()
	}

	routes() {
		this.router.get("/", userController.index())
		this.router.get("/:id", userController.show())
		this.router.post("/", this.validate(userValidator.store()), userController.store())
		this.router.post("/login", this.validate(userValidator.login()), userController.login())
		this.router.get("/auth", userController.auth())
	}
}

export default UserRoute
