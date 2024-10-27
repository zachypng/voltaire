import { z } from 'zod';

export const avatarSchema = z.object({
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
});

export type FormSchema = typeof avatarSchema;
