import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Id } from '@domain/entity/user';

async function bootstrap() {
  const id = new Id(1);
  console.log(id);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
