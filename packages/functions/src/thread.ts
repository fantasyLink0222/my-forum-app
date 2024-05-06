//lambda.ts
import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { threads as threadsTable } from '@my-forum-app/core/db/schema/threads';
import { db } from '@my-forum-app/core/db';
import { sum, eq, desc } from 'drizzle-orm';

const app = new Hono();

app.get('/', (c) => c.text('Welcome to the Forum API!'));

app.get('/threads', async (c) => {
  // Implement fetching all threads logic

  const threads = await db.select().from(threadsTable);
  return c.json(threads);
});
// CRUD operations for threads
app.post('/threads', async (c) => {
  // Implement creating a new thread logic
  //const userId = c.var.userId;
  const body = await c.req.json();
  const thread = { ...body.thread };
  const newThread = await db.insert(threadsTable).values(thread).returning();
  console.log(thread);
  return c.json({ thread: newThread });
});

app.get('/threads/:id', async (c) => {
  // Implement fetching a single thread by id
  const id = Number(c.req.param('id')); // Convert id to number
  console.log(id);

  const thread = await db
    .select()
    .from(threadsTable)
    .where(eq(threadsTable.id, id)); // Use the correct type for id
  return c.json(thread);
});

app.delete('/threads/:id', async (c) => {
  // Implement deleting a thread by id
  const id = Number(c.req.param('id')); // Convert id to number
  await db.delete(threadsTable).where(eq(threadsTable.id, id)); // Use the correct type for id
  return c.json({ message: 'Thread deleted successfully' });
});

app.put('/threads/:id', async (c) => {
  const id = Number(c.req.param('id')); // Convert id to number
  const body = await c.req.json();
  const thread = body.thread;
  const updatedThread = await db
    .update(threadsTable)
    .set(thread)
    .where(eq(threadsTable.id, id));
  return c.json({
    message: 'Thread updated successfully',
    thread: updatedThread,
  });
});

export const handler = handle(app);
