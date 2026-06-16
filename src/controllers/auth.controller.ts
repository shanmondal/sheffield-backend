import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { adminLoginSchema } from '../validations/auth.validation';

export const login = async (req: Request, res: Response) => {
  try {
    const validation = adminLoginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: 'Validation failed',
      });
    }

    const { username, password } = req.body;

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      {
        username,
        role: 'ADMIN',
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d',
      },
    );

    return res.json({
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Login failed',
    });
  }
};
