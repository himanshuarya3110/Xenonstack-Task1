import express from "express"
import { AuthRouter } from "../modules/Auth/auth.routes.js"
import { PropertyRouter } from "../modules/property/property.routes.js"

export const mainrouter = express.Router()

mainrouter.use("/auth" ,AuthRouter)
mainrouter.use("/recommend" ,PropertyRouter )