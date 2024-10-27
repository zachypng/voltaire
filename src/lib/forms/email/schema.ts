import { z } from 'zod';

export const emailSchema = z.object({
	email: z.string().min(2).max(150).email()
});

export type FormSchema = typeof emailSchema;
