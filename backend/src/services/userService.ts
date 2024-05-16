import User, { IUser } from "../models/user";
import { GlobalError } from "../utils/exceptionHandling/GlobalError";

export const userService = {
    createUser: async (userData: IUser) => {
        try {
            const existingUser = await User.findOne({ where: { email: userData.email } });
            if (existingUser) {
                throw new GlobalError(409, 'User with this email already exists');
            }
            const { name, email, password } = userData;
            console.log(name, email, password)
            const newUser = await User.create({ name, email, password });
            return newUser;
        } catch (err) {
            if(err instanceof GlobalError) throw new GlobalError(err.statusCode, `Error while creating user: ${err.message}`);
            throw new GlobalError(500, `Error while creating user: ${err}`);
        }
    },

    getUserByEmail: async (email: string) => {
        try {
            const user = await User.findOne({ where: {email: email} });
            return user;
        } catch (err) {
            throw new GlobalError(500, "Error while fetching user by email: " + err);
        }
    },
    updateUserPassword: async (userId: string, newPassword: string) => {
        try {
            const existingUser = await User.findByPk(userId);
            if (!existingUser) {
                throw new GlobalError(404, "User not found with id: "+userId);
            }
            console.log(existingUser)
            const updatedUser = await existingUser.update({ password: newPassword });
            return updatedUser;
        } catch (err) {
            if(err instanceof GlobalError)
                throw new GlobalError(404, err.message);
            throw new GlobalError(500, "Error while updating user password: " + err);
        }
    }
};
