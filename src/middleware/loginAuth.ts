// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Unauthorized' });
            }

            // Assuming decoded token has userId field
            const { userId, iat, exp } = decoded as { userId: number; iat: number; exp: number };
            req.user = { id: userId, iat, exp };
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
