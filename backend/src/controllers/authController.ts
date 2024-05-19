import { NextFunction, Request, Response } from "express"
import { authService } from "../services/authService";
import { sendResponse } from "../utils/helper";

export const authController = {
    getLogin : async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const token = await authService.login(email, password);

            if (token) {
                res.setHeader('Authorization', `Bearer ${token}`);
                sendResponse(res, 200, { message: 'Login successful', loggedIn: true });
            } else {
                sendResponse(res, 401, { message: 'Invalid email or password', loggedIn: false });
            }
        } catch (error) {
            next(error);
        }    
    }
}