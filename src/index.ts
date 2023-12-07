import { createApp } from '@/api';

const app = await createApp();
const port = Bun.env.HTTP_PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}...`);
});
