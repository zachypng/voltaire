import { lucia } from '$lib/server/auth/lucia';
import { createPasswordResetToken, getUserByEmail, getUserByUsername } from '$lib/server/db/users';
import { redirect, type Actions } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import type { PageServerLoad } from './$types.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { passwordResetSchema } from '$lib/forms/passwordReset/requestSchema';
import { PLUNK_SECRET } from '$env/static/private';
import { render } from 'svelte-email';
import PasswordReset from '$lib/emails/PasswordReset.svelte';

export const load: PageServerLoad = async (event) => {
	return {
		passwordResetForm: await superValidate(zod(passwordResetSchema))
	};
};

export const actions: Actions = {
	requestReset: async (event) => {
		const form = await superValidate(event, zod(passwordResetSchema));
		if (!form.valid) {
			return message(form, {
				type: 'error',
				text: 'Form is invalid!'
			});
		}
		const user = await getUserByEmail(form.data.email);
		if (!user) {
			return message(form, {
				type: 'success',
				text: 'Email sent! Check your inbox for further instructions.'
			});
		}

		// Generate verification link
		const verificationToken = await createPasswordResetToken(user.id);
		const verificationLink = event.url.host + '/auth/password-reset/' + verificationToken;

		// Create the email HTML
		const emailHTML = render({
			template: PasswordReset,
			props: {
				preview: 'A password reset for your Voltaire account has been requested.',
				resetURL: verificationLink,
				user: user.username
			}
		});

		// Invalidate user sessions
		await lucia.invalidateUserSessions(user.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		// Send password reset email
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${PLUNK_SECRET}` },
			body: `{"to":"${user.email}","subject":"Voltaire - Password Reset","body":${JSON.stringify(emailHTML)}}`
		};
		await event
			.fetch('https://api.useplunk.com/v1/send', options)
			.then((response) => response.json())
			.then((response) => console.log(response))
			.catch((err) => console.error(err));

		return message(form, {
			type: 'success',
			text: 'Email sent! Check your inbox for further instructions :p'
		});
	}
};
