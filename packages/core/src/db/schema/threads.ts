import { table } from 'console';
import {
  pgTable,
  text,
  varchar,
  timestamp,
  numeric,
  serial,
  date,
  index,
} from 'drizzle-orm/pg-core';

export const threads = pgTable('threads', {
  id: serial('id').primaryKey(),
  //userId: text('user_id').notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
});
