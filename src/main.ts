import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Content-Type", "application/json");
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
