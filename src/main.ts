import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  // const port = app.get('ConfigService').get('app.port');
  await app.listen(3020);
}
bootstrap();
