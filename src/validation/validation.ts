import { z } from 'zod';

export const RegisterSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'username Required',
      })
      .min(3),
    email: z
      .string({
        required_error: 'email Required',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'password required',
      })
      .min(5, 'Password to short, it should be min 5 chars'),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'username Required',
      })
      .min(3),
    password: z
      .string({
        required_error: 'password required',
      })
      .min(5, 'Password to short, it should be min 5 chars'),
  }),
});
