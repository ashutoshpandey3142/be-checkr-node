import { IUser } from '../../src/models/user';

export const userData: IUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
};

export const existingUser: any = {
    id: "123",
    name: "Test User",
    email: "test@example.com",
    password: "oldPassword123"
};

export const updateUser: any = {
    email: "test@example.com",
    id: "123",
    name: "Test User",
    password: "newPassword123",
};
import bcrypt from 'bcrypt';

export const encryptedUser = {
    email: 'test@example.com',
    password: 'password123',
    hashedPassword: bcrypt.hashSync('password123', 10)
};

export const invalidUserData = {
    email: 'invalid@example.com',
    password: 'invalidpassword'
};

export const errorMessage = 'Some error message';
