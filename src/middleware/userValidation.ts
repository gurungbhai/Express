// src/middleware/validateUser.ts
import { body, validationResult } from 'express-validator';
import { User } from '../entity/User';
import { Request, Response, NextFunction } from 'express';

export const userValidationRules = () => [
  body('name').not().isEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('email').custom(async (email) => {
    const user = await User.findOneBy({ email });
    if (user) {
      throw new Error('Email already in use');
    }
  }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
