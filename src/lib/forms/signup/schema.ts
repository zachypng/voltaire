import { z } from 'zod';

export const signupSchema = z
	.object({
		email: z.string().min(2).max(150).email(),
		username: z.string().min(2).max(50),
		password: z.string().min(6).max(150),
		confirm: z.string().min(6).max(150),
		avatar: z
			.enum([
				'bird',
				'cat',
				'dog',
				'fish',
				'origami',
				'rabbit',
				'rat',
				'snail',
				'squirrel',
				'turtle',
				'user',
				'worm'
			])
			.default('' as 'user')
	})
	.refine((data) => data.password === data.confirm, {
		message: 'Passwords do not match',
		path: ['confirm']
	});

export type FormSchema = typeof signupSchema;
