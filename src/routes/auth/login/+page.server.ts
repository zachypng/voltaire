import { lucia } from '$lib/server/auth/lucia';
import { getUserByEmail, getUserByUsername } from '$lib/server/db/users';
import { redirect, type Actions } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import type { PageServerLoad } from './$types.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/forms/login/schema.js';

export const load: PageServerLoad = async () => {
	return {
		loginForm: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	// default: async ({ cookies, request }) => {
	// 	const formData = Object.fromEntries(await request.formData());
	// 	const { email, password, username } = formData as {
	// 		email: string | undefined;
	// 		password: string | undefined;
	// 		username: string | undefined;
	// 	};

	// 	if (!email || !password || !username) {
	// 		return fail(400, { error: 'Email/username and password are required' });
	// 	}

	// 	// const userId = generateId(15);
	// 	// const hashedPassword = await new Argon2id().hash(password);
	// 	let login = undefined;
	// 	if (username.includes('@')) {
	// 		login = await getUserByEmail(email);
	// 	}
	// 	if (!username.includes('@')) {
	// 		login = await getUserByUsername(username);
	// 	}
	// 	// const user = await getUserByEmail(email);
	// 	if (!login) {
	// 		return fail(400, { error: 'Invalid email or password' });
	// 	}

	// 	// Verify the password
	// 	const validPassword = await new Argon2id().verify(login.hashedPassword, password);
	// 	if (!validPassword) {
	// 		return fail(400, { error: 'Invalid email or password' });
	// 	}

	// 	// Create a new session and set the session cookie
	// 	const session = await lucia.createSession(login.id, {
	// 		created_at: new Date(),
	// 		updated_at: new Date()
	// 	});
	// 	const sessionCookie = lucia.createSessionCookie(session.id);

	// 	cookies.set(sessionCookie.name, sessionCookie.value, {
	// 		path: '.',
	// 		...sessionCookie.attributes
	// 	});

	// 	redirect(302, '/');
	// },
	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return message(form, {
				type: 'error',
				text: 'Form is invalid!'
			});
		}
		let login = undefined;
		if (form.data.email.includes('@')) {
			login = await getUserByEmail(form.data.email);
		}
		if (!form.data.email.includes('@')) {
			login = await getUserByUsername(form.data.username);
		}
		if (!login) {
			return message(form, {
				type: 'error',
				text: 'Invalid login'
			});
		}

		// Verify the password
		const validPassword = await new Argon2id().verify(login.hashedPassword, form.data.password);
		if (!validPassword) {
			return message(form, {
				type: 'error',
				text: 'Invalid email or password'
			});
		}

		// Create a new session and set the session cookie
		const session = await lucia.createSession(login.id, {
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
