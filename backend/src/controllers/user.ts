import { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";
import { GlobalError } from "../utils/exceptionHandling/GlobalError";
import { sendResponse } from "../utils/helper";

export const userController = {
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;
            const newUser = await userService.createUser({ name, email, password });

            sendResponse(res, 201, { message: "User created successfully", user: newUser });
        } catch (err) {
            next(err);
        }
    },

    getUserByEmail: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req.query.email as string;
            const user = await userService.getUserByEmail(email);
            if (!user) {
                throw new GlobalError(404, 'User Not Found with email: '+email);
            } else {
                sendResponse(res, 200, { message: "User found", user });
            }
        } catch (err) {
            next(err);
        }
    },

    updateUserPassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId
            const { newPassword } = req.body;
            const updatedUser = await userService.updateUserPassword(userId, newPassword);
            if (!updatedUser) {
                throw new GlobalError(404, 'User Not Found with userId: '+userId);
            } else {
                sendResponse(res, 200, { message: "User password updated successfully", user: updatedUser });
            }
        } catch (err) {
            next(err);
        }
    }
};
