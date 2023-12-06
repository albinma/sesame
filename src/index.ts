import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send(Bun.env.NODE_ENV);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}...`);
});
