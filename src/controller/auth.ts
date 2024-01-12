import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../helper/bcrypt';

const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return res.status(400).json({
        message: 'email has taken',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'username has taken',
      });
    }

    const encryptedPassword = hashPassword(password);

    const createdUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: encryptedPassword,
        imageUrl:
          'https://storage.googleapis.com/assets-enterity/profile_picture/Enterity_logo.png',
      },
    });

    res.status(201).json({
      createdUser,
      message: 'user has been created',
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUsername) {
      return res.status(400).json({
        message: 'Username is no registered',
      });
    }

    const passwordMatches = await comparePassword(password, existingUsername.password);
    if (passwordMatches) {
      return res.status(200).json({
        message: 'user login successfully',
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'error',
    });
  }
};

export { register, login };
