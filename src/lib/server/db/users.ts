import { db } from '$lib/server/db';
import { passwordResets, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { Argon2id } from 'oslo/password';
import { encodeHex } from 'oslo/encoding';
import { sha256 } from 'oslo/crypto';
import { createDate, TimeSpan } from 'oslo';

const getUserByEmail = async (email: string) => {
	return db.select().from(users).where(eq(users.email, email)).get();
};

const getUserByID = async (userId: string) => {
	return db.select().from(users).where(eq(users.id, userId)).get();
};

const getUserByUsername = async (username: string) => {
	return db.select().from(users).where(eq(users.username, username)).get();
};

const createNewUser = async (data: typeof users.$inferInsert) => {
	return (await db.insert(users).values(data).returning())[0];
};

const deleteUser = async (userId: string) => {
	return db.delete(users).where(eq(users.id, userId));
};

const updateUsername = async (currentUsername: string, newUsername: string) => {
	return db
		.update(users)
		.set({ username: newUsername, updatedAt: new Date() })
		.where(eq(users.username, currentUsername));
};

const updateEmail = async (userId: string, email: string) => {
	return db.update(users).set({ email: email, updatedAt: new Date() }).where(eq(users.id, userId));
};

const updatePassword = async (userId: string, password: string) => {
	const hashedPassword = await new Argon2id().hash(password);
	return db
		.update(users)
		.set({ hashedPassword: hashedPassword, updatedAt: new Date() })
		.where(eq(users.id, userId));
};

const createPasswordResetToken = async (userId: string) => {
	// Invalidate existing tokens
	await db.delete(passwordResets).where(eq(passwordResets.userId, userId));

	// Create new token
	const tokenId = generateIdFromEntropySize(25);
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
	await db.insert(passwordResets).values({
		tokenHash: tokenHash,
		userId: userId,
		createdAt: new Date(),
		expiresAt: createDate(new TimeSpan(2, 'h'))
	});
	return tokenId;
};

const updateAvatar = async (
	userId: string,
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
) => {
	return db
		.update(users)
		.set({ avatar: avatar, updatedAt: new Date() })
		.where(eq(users.id, userId));
};

export {
	createNewUser,
	deleteUser,
	getUserByEmail,
	getUserByID,
	getUserByUsername,
	updateAvatar,
	updateUsername,
	updateEmail,
	updatePassword,
	createPasswordResetToken
};
