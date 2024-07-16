// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

// Define the User type according to your application's user model

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.status(401).json({ msg: 'Unauthorized' });
            }

            req.user = user as User; 
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
