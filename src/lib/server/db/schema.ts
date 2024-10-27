import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateId } from 'lucia';

const timestamp = {
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
};

const users = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId(15)),
	email: text('email').unique().notNull(),
	hashedPassword: text('hashed_password').notNull(),
	username: text('username').unique().notNull(),
	avatar: text('avatar', {
		enum: [
			'bird',
			'cat',
			'dog',
			'fish',
			'origami',
			'rabbit',
			'rat',
			'snail',
			'squirrel',
			'turtle',
			'user',
			'worm'
		]
	}).default('user'),

	...timestamp
});

const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey().notNull(),
	// .$defaultFn(() => generateId(15)),
	expiresAt: integer('expires_at').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),

	...timestamp
});

const passwordResets = sqliteTable('password_resets', {
	tokenHash: text('token_hash').notNull().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	expiresAt: integer('expires_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date(Date.now() + 1000 * 60 * 60 * 2))
});

export { sessions, users, passwordResets };
