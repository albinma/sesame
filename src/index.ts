import { createApp } from '@/api/api';
import { APP_CONFIG } from '@/common/configs/env';
import { logger } from '@/common/initializers/logger';

const app = await createApp();
const { port } = APP_CONFIG.http;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  logger.info(`Listening on port ${port}...`);
});
