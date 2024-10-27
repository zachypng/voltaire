import { z } from 'zod';

export const deleteAccountSchema = z.object({
	confirm: z.string().min(9).max(9)
});

export type FormSchema = typeof deleteAccountSchema;
