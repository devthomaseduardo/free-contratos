import { createApp } from './app.js';
import { config } from './config.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`API em http://localhost:${config.port}/api/v1`);
  console.log(`Swagger UI: http://localhost:${config.port}/api/v1/docs`);
  console.log(`OpenAPI JSON: http://localhost:${config.port}/api/v1/openapi.json`);
});
