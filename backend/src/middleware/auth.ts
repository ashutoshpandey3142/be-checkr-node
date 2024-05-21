import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

export const AuthMiddleware = {
    authenticateToken : (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        jwt.verify(token, 'your-secret-key', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            next();
        });
    }
}