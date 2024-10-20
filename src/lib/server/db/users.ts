import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const getUserByEmail = async (email: string) => {
	return db.select().from(users).where(eq(users.email, email)).get();
};

const getUserByUsername = async (username: string) => {
	return db.select().from(users).where(eq(users.username, username)).get();
};

const createNewUser = async (data: typeof users.$inferInsert) => {
	return (await db.insert(users).values(data).returning())[0];
};

export { createNewUser, getUserByEmail, getUserByUsername };
