//lambda.ts
import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { threads as threadsTable } from '@my-forum-app/core/db/schema/threads';
import { db } from '@my-forum-app/core/db';
import { sum, eq, desc } from 'drizzle-orm';

const app = new Hono();
app.get('/', (c) => c.text('Welcome to the Forum API!'));
app.get('/threads', async (c) => {
  const threads = await db.select().from(threadsTable);
  return c.json(threads);
});
app.post('/threads', async (c) => {
  const body = await c.req.json();
  const thread = {
    title: body.title,
    content: body.content,
    createdAt: new Date(),
  };
  const newThread = await db.insert(threadsTable).values(thread).returning();
  return c.json({ thread: newThread });
});

app.get('/threads/:id', async (c) => {
  const id = Number(c.req.param('id'));
  console.log(id);

  const thread = await db
    .select()
    .from(threadsTable)
    .where(eq(threadsTable.id, id));
  return c.json(thread);
});

app.delete('/threads/:id', async (c) => {
  const id = Number(c.req.param('id'));
  await db.delete(threadsTable).where(eq(threadsTable.id, id));
  return c.json({ message: 'Thread deleted successfully' });
});
app.put('/threads/:id', async (c) => {
  const id = Number(c.req.param('id'));
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
