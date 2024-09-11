import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js"

const router=  Router()

console.log("no error encountered");


router.route("/register").post(registerUser)


export default router;