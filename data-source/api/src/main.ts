import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RACES from '@batch/const/Races';

async function bootstrap() {
  console.log(RACES);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
