import User, { IUser } from "../models/user";
import { GlobalError } from "../utils/exceptionHandling/GlobalError";
import bcrypt from 'bcrypt';


export const userService = {
    createUser: async (userData: IUser) => {
        try {
            const existingUser = await User.findOne({ where: { email: userData.email } });
            if (existingUser) {
                throw new GlobalError(409, 'User with this email already exists');
            }
            const { name, email, password } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ name, email, password: hashedPassword });
            console.log(newUser)
            return newUser;
        } catch (err) {
            if(err instanceof GlobalError) throw new GlobalError(err.statusCode, `Error while creating user: ${err.message}`);
            throw new GlobalError(500, `Error while creating user: ${err}`);
        }
    },
    

    getUserByEmail: async (email: string) => {
        const user = await User.findOne({ where: {email: email} });
        return user;
    },
    updateUserPassword: async (userId: string, newPassword: string) => {
        try {
            const existingUser = await User.findByPk(userId);
            if (!existingUser) {
                throw new GlobalError(404, "User not found with id: "+userId);
            }
            const updatedUser = await existingUser.update({ password: newPassword });
            return updatedUser;
        } catch (err) {
            if(err instanceof GlobalError)
                throw new GlobalError(404, err.message);
            throw new GlobalError(500, "Error while updating user password: " + err);
        }
    }
};
