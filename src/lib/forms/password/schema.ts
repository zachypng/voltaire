import { z } from 'zod';

export const passwordSchema = z.object({
	currentPassword: z.string().min(6).max(50),
	newPassword: z.string().min(6).max(50)
});

export type FormSchema = typeof passwordSchema;
