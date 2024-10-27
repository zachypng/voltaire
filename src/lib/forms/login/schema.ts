import { z } from 'zod';

export const loginSchema = z.object({
	username: z.string().min(2).max(150),
	email: z.string().min(2).max(150),
	password: z.string().min(6).max(150)
});

export type FormSchema = typeof loginSchema;
