import { Router } from "express";
import { userController } from "../controllers/user";
import { createUserRequestValidation, updateUserRequestValidation } from "../utils/validation/user";
import { handleValidationErrors } from "../utils/validation/handleValidation";


const userRoutes = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
userRoutes.post('/', createUserRequestValidation, handleValidationErrors, userController.createUser);


/**
 * @openapi
 * /users/by-email:
 *   get:
 *     summary: Retrieve a user by email
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to retrieve
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRoutes.get('/by-email', userController.getUserByEmail);


/**
 * @openapi
 * /users/{userId}/update-password:
 *   patch:
 *     summary: Update a user's password by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose password needs to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User password updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRoutes.patch('/:userId/update-password', updateUserRequestValidation, handleValidationErrors, userController.updateUserPassword);

export default userRoutes;