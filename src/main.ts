import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Car-Pars-Store')
    .setDescription('API Car-Pars-Store')
    .setVersion('1.0')
    .addTag('status')
    .addTag('users')
    .addTag('products')
    .addTag('table')
    .addTag('category')
    .addTag('favorites')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);
}
bootstrap();
