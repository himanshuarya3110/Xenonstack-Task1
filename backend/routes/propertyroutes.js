import express from "express"
import { PropertyController } from "../controllers/property.js"
import { isAuth } from "../middlerwares/Auth.js"

const propertyrouter = express.Router()

propertyrouter.post('/recommendations', isAuth("Admin"), PropertyController.recommnendcontroller)

export const PropertyRouter = propertyrouter