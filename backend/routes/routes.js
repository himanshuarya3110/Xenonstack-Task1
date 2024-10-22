import express from "express"
import { AuthRouter } from "./authroutes.js"
import { PropertyRouter } from "./propertyroutes.js"

export const mainrouter = express.Router()

mainrouter.use("/auth", AuthRouter)
mainrouter.use("/recommend", PropertyRouter)