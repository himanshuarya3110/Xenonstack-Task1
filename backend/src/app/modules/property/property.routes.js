import express from "express"
import { PropertyController } from "./property.controller.js"
import { isAuth } from "../../middlewares/Auth.js"

const propertyrouter = express.Router()

propertyrouter.post('/recommendations', isAuth("Admin"), PropertyController.recommnend  )

export const  PropertyRouter  = propertyrouter