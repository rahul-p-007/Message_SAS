import express from "express"


import { Logout, Login, Signup } from "../controllers/auth.controller.js"


const router = express.Router()
// Routes
router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",Logout)


export default router