import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// if (!locals.user) redirect(302, '/auth/login');
	const user = locals.user;
	const session = locals.session;

	return {
		user,
		session
	};
};
