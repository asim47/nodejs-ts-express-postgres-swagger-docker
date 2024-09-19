import { PASSWORD_REGEX } from '../helpers/contants';
import { z } from 'zod';

export const zodPasswordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(PASSWORD_REGEX, 'Password does not meet complexity requirements');

export const RegisterUserBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: zodPasswordValidation,
});

export type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;
