import { lucia } from '$lib/server/auth/lucia';
import { createNewUser, getUserByEmail, getUserByUsername } from '$lib/server/db/users';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email, password, username, avatar } = formData as {
			email: string | undefined;
			password: string | undefined;
			username: string | undefined;
			avatar:
				| 'bird'
				| 'cat'
				| 'dog'
				| 'fish'
				| 'origami'
				| 'rabbit'
				| 'rat'
				| 'snail'
				| 'squirrel'
				| 'turtle'
				| 'user'
				| 'worm'
				| undefined;
		};

		if (!email || !password || !username || !avatar) {
			return fail(400, { error: 'Email, username, and password are required' });
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		// Check if the email already exists
		const userByEmail = await getUserByEmail(email);
		if (userByEmail) {
			return fail(400, { error: 'Email already exists' });
		}

		// Check if the username already exists
		const userByUsername = await getUserByUsername(username);
		if (userByUsername) {
			return fail(400, { error: 'Username already exists' });
		}

		// Create a new user
		const newUser = await createNewUser({ id: userId, email, username, hashedPassword, avatar });

		// Create a new session and set the session cookie
		const session = await lucia.createSession(newUser.id, {
			created_at: new Date(),
			updated_at: new Date()
		});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/profile');
	}
};
