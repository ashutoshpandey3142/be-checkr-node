import { Router } from "express";
import { authController } from "../controllers/authController";

const authRoutes = Router()

authRoutes.get('/login', authController.getLogin)

export default authRoutes