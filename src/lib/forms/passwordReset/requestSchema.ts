import { z } from 'zod';

export const passwordResetSchema = z.object({
	email: z.string().min(2).max(150).email()
});

export type FormSchema = typeof passwordResetSchema;
