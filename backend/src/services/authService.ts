import User from "../models/user";
import bcrypt from 'bcrypt'
import { GlobalError } from "../utils/exceptionHandling/GlobalError";
import jwt from 'jsonwebtoken'

export const authService = {
    login: async (email: string, password: string) => {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return false;
            }

            const isPasswordValid = await bcrypt.compare(password, user.dataValues?.password ?? '');

            if (!isPasswordValid) {
                return false;
            }

            const token = jwt.sign({ userId: user.dataValues.id, email: user.dataValues.email }, 'your-secret-key', { expiresIn: '5m' });

            return token;
        } catch (error) {
            throw new GlobalError(500, `Error while logging in: ${error}`);
        }
    }
};
