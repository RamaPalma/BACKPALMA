import { Router } from "express";
import passport from "passport";
import '../passport/localPass.js'
import { loginUser,registro} from "../controllers/user.controller.js";

const usersRouter = Router()


usersRouter.post('/login', loginUser)

usersRouter.post('/registro', registro)




export default usersRouter