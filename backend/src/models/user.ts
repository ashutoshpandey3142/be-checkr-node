import { DataTypes } from "sequelize";
import { database } from "../config/db";

/**
 * @openapi
 * components:
 *   schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The unique identifier for the user
 *        name:
 *          type: string
 *          description: The name of the user
 *        email:
 *          type: string
 *          format: email
 *          description: The email address of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *      required:
 *        - name
 *        - email
 *        - password
 */
const User = database.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User


export interface IUser { name: string, email: string, password: string }