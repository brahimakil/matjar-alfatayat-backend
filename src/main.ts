import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { initializeFirebase } from './config/firebase.config';
import * as express from 'express';

async function bootstrap() {
  // Initialize Firebase
  initializeFirebase();

  const app = await NestFactory.create(AppModule);
  
  // Increase body size limit to 50MB
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  
  // Enable CORS
  app.enableCors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
