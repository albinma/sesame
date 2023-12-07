import { createApp } from '@/common/initializers/app';

const app = await createApp();
const port = Bun.env.HTTP_PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}...`);
});
