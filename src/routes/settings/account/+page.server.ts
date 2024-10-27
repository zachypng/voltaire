import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { emailSchema } from '$lib/forms/email/schema';
import { passwordSchema } from '$lib/forms/password/schema';
import { deleteAccountSchema } from '$lib/forms/deleteAccount/schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
	deleteUser,
	getUserByEmail,
	getUserByID,
	updateEmail,
	updatePassword
} from '$lib/server/db/users';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/server/auth/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/auth/login');
	const user = locals.user;
	const session = locals.session;

	return {
		user,
		session,
		emailForm: await superValidate(zod(emailSchema)),
		passwordForm: await superValidate(zod(passwordSchema)),
		deleteAccountForm: await superValidate(zod(deleteAccountSchema))
	};
};

export const actions: Actions = {
	updateEmail: async (event) => {
		const form = await superValidate(event, zod(emailSchema));
		if (!form.valid || !event.locals.user) {
			return message(form, {
				type: 'error',
				text: 'Invalid input or your session is invalid, please login again'
			});
		}

		// Check if the email already exists
		const userByEmail = await getUserByEmail(form.data.email);
		if (userByEmail) {
			return message(form, { type: 'error', text: 'Email already exists' });
		}

		updateEmail(event.locals.user.id, form.data.email);

		return message(form, { type: 'success', text: 'Email updated successfully' });
	},
	updatePassword: async (event) => {
		const form = await superValidate(event, zod(passwordSchema));
		if (!form.valid || !event.locals.user) {
			return message(form, {
				type: 'error',
				text: 'Invalid input or your session is invalid, please login again'
			});
		}

		// Verify the current password
		const currentLogin = await getUserByID(event.locals.user.id);
		if (!currentLogin) {
			return message(form, {
				type: 'error',
				text: 'Invalid input or your session is invalid, please login again'
			});
		}
		const validPassword = await new Argon2id().verify(
			currentLogin.hashedPassword,
			form.data.currentPassword
		);
		if (!validPassword) {
			return message(form, { type: 'error', text: 'Incorrect password' });
		}

		updatePassword(currentLogin.id, form.data.newPassword);

		// Invalidate all sessions then Create a new session and set the session cookie
		await lucia.invalidateUserSessions(event.locals.user.id);
		const session = await lucia.createSession(event.locals.user.id, {
			created_at: new Date(),
			updated_at: new Date()
		});
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return message(form, { type: 'success', text: 'Password updated successfully' });
	},
	deleteAccount: async (event) => {
		const form = await superValidate(event, zod(deleteAccountSchema));
		if (!form.valid || !event.locals.user || !event.locals.session) {
			return message(form, {
				type: 'error',
				text: 'Invalid input or your session is invalid, please login again'
			});
		}
		const user = event.locals.user;

		if (form.data.confirm !== 'delete-me') {
			return message(form, { type: 'error', text: 'Invalid confirmation' });
		}

		if (!event.locals.user.id) {
			return message(form, {
				type: 'error',
				text: 'User does not exist, please try again'
			});
		}

		await lucia.invalidateSession(event.locals.session.id).then(() => deleteUser(user.id));
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
