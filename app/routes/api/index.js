import { createRequire } from "module"

const require = createRequire(import.meta.url)

const express = require("express")
const router = express.Router()

import UserRoute from "./user.route.js"
import AccountRoute from "./account.route.js"

// Use your routes
router.use("/users", new UserRoute().router)
router.use("/accounts", AccountRoute)

export default router
