//lambda.ts
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const fakeData = [
    { title: 'Thread 1', content: 'Content of thread 1', id: 1 },
    { title: 'Thread 2', content: 'Content of thread 2', id: 2 },
]

type Thread = {
    title: string;
    content: string;
    id: number;
};

const app = new Hono()

app.get('/', (c) => c.text('Welcome to the Forum API!'));

// CRUD operations for threads
app.post('/threads', async (c) => {
  // Implement creating a new thread logic
  const body = await c.req.json();
  const title  = body.title;
  const content = body.content;
  
  fakeData.push({ title, content, id: fakeData.length + 1 });
  console.log(fakeData);

  return c.json({ title, content });
});

app.get('/threads', async (c) => {
  // Implement fetching all threads logic

  return c.json(fakeData);

  
});

app.get('/threads/:id', async (c) => {
  // Implement fetching a single thread by id
  const id = c.req.param('id');
  console.log(id);
  const thread = fakeData.find((t) => t.id === parseInt(id));

  return c.json(thread);
});

app.delete('/threads/:id', async (c) => {
  // Implement deleting a thread by id
  const id = c.req.param('id');
  const threadIndex = fakeData.findIndex((t) => t.id === parseInt(id));
  if (threadIndex !== -1) {
    fakeData.splice(threadIndex, 1);
    return c.text('Thread deleted successfully', 200);
  } else {
    return c.text('Thread not found', 404);
  }
});

app.put('/threads/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  if (fakeData.some((t) => t.id === parseInt(id))) {
    const existingThread = fakeData.find((t) => t.id === parseInt(id));
    const updatedThread = { ...existingThread, ...body, updatedAt: new Date() };
    fakeData[parseInt(id) - 1] = updatedThread;
    return c.json(updatedThread);
  }
  return c.text('Thread not found', 404);
});


export const handler = handle(app);
