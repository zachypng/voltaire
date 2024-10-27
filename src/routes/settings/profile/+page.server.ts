import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { usernameSchema } from '$lib/forms/username/schema';
import { avatarSchema } from '$lib/forms/avatar/schema';
import { setError, superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { getUserByUsername, updateAvatar, updateUsername } from '$lib/server/db/users';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/auth/login');
	const user = locals.user;
	const session = locals.session;

	return {
		user,
		session,
		avatarForm: await superValidate(zod(avatarSchema)),
		usernameForm: await superValidate(zod(usernameSchema))
	};
};

export const actions: Actions = {
	updateUsername: async (event) => {
		const form = await superValidate(event, zod(usernameSchema));
		if (!form.valid || !event.locals.user) {
			return message(form, {
				type: 'error',
				text: 'Invalid input or your session is invalid, please login again'
			});
		}

		// Check if the username already exists
		const userByUsername = await getUserByUsername(form.data.username);
		if (userByUsername) {
			// return setError(form, 'username', 'Username already exists');
			return message(form, { type: 'error', text: 'Username already exists' });
		}

		updateUsername(event.locals.user.username, form.data.username);

		return message(form, { type: 'success', text: 'Username updated successfully' });
	},
	updateAvatar: async (event) => {
		const form = await superValidate(event.request, zod(avatarSchema));
		if (!form.valid || !event.locals.user) {
			return fail(400, { form });
		}

		updateAvatar(event.locals.user.id, form.data.avatar);

		return message(form, { type: 'success', text: 'Avatar updated successfully' });
	}
};
