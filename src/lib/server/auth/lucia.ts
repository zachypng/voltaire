import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$lib/server/db';
import { sessions, users } from '../db/schema';
import { Lucia } from 'lucia';
import { dev } from '$app/environment';

interface DatabaseUserAttributes {
	email: string;
	username: string;
	avatar: string;
}

interface DatabaseSessionAttributes {
	created_at: Date;
	updated_at: Date;
}

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			username: attributes.username,
			avatar: attributes.avatar
		};
	},
	getSessionAttributes: (attributes) => {
		return {
			created_at: attributes.created_at,
			updated_at: attributes.updated_at
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
	}
}

export { lucia };
