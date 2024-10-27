import { lucia } from '$lib/server/auth/lucia';
import { createNewUser, getUserByEmail, getUserByUsername } from '$lib/server/db/users';
import { redirect, type Actions } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import type { PageServerLoad } from './$types.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from '$lib/forms/signup/schema';

export const load: PageServerLoad = async () => {
	return {
		signupForm: await superValidate(zod(signupSchema))
	};
};

export const actions: Actions = {
	// default: async ({ cookies, request }) => {
	// 	const formData = Object.fromEntries(await request.formData());
	// 	const { email, password, username, avatar } = formData as {
	// 		email: string | undefined;
	// 		password: string | undefined;
	// 		username: string | undefined;
	// 		avatar:
	// 			| 'bird'
	// 			| 'cat'
	// 			| 'dog'
	// 			| 'fish'
	// 			| 'origami'
	// 			| 'rabbit'
	// 			| 'rat'
	// 			| 'snail'
	// 			| 'squirrel'
	// 			| 'turtle'
	// 			| 'user'
	// 			| 'worm'
	// 			| undefined;
	// 	};

	// 	if (!email || !password || !username || !avatar) {
	// 		return fail(400, { error: 'Email, username, and password are required' });
	// 	}

	// 	const userId = generateId(15);
	// 	const hashedPassword = await new Argon2id().hash(password);

	// 	// Check if the email already exists
	// 	const userByEmail = await getUserByEmail(email);
	// 	if (userByEmail) {
	// 		return fail(400, { error: 'Email already exists' });
	// 	}

	// 	// Check if the username already exists
	// 	const userByUsername = await getUserByUsername(username);
	// 	if (userByUsername) {
	// 		return fail(400, { error: 'Username already exists' });
	// 	}

	// 	// Create a new user
	// 	const newUser = await createNewUser({ id: userId, email, username, hashedPassword, avatar });

	// 	// Create a new session and set the session cookie
	// 	const session = await lucia.createSession(newUser.id, {
	// 		created_at: new Date(),
	// 		updated_at: new Date()
	// 	});
	// 	const sessionCookie = lucia.createSessionCookie(session.id);

	// 	cookies.set(sessionCookie.name, sessionCookie.value, {
	// 		path: '.',
	// 		...sessionCookie.attributes
	// 	});

	// 	redirect(302, '/profile');
	// },
	signup: async (event) => {
		const form = await superValidate(event, zod(signupSchema));
		if (!form.valid) {
			return message(form, {
				type: 'error',
				text: 'Form is invalid!'
			});
		}

		// Generate UUID and hashword
		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(form.data.password);

		// Check if the email already exists
		const userByEmail = await getUserByEmail(form.data.email);
		if (userByEmail) {
			return message(form, { type: 'error', text: 'Email already exists' });
		}

		// Check if the username already exists
		const userByUsername = await getUserByUsername(form.data.username);
		if (userByUsername) {
			return message(form, { type: 'error', text: 'Username already exists' });
		}

		// Check if username contains @
		if (form.data.username.includes('@')) {
			return message(form, { type: 'error', text: 'Username cannot contain @' });
		}

		// Create new user
		const newUser = await createNewUser({
			id: userId,
			email: form.data.email,
			username: form.data.username,
			hashedPassword,
			avatar: form.data.avatar
		});

		// Create a new session and set the session cookie
		const session = await lucia.createSession(newUser.id, {
			created_at: new Date(),
			updated_at: new Date()
		});
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/settings/profile');
	}
};
