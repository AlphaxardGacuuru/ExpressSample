import express from "express"
// import { protect } from "../../middleware/AuthMiddleware"

import AccountController from "../../controllers/account.controller.js"

const AccountRoutes = express.Router()

/*
 * Account Routes
 */

AccountRoutes.route("/").get(AccountController.index)
// router.route("/:id").get(protect, show)
// router.route("/").post(protect, store)
// router.route("/:id").put(protect, update)
// router.route("/:id").delete(protect, destory)

export default AccountRoutes
