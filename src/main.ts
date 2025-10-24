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
  
  // Enable CORS - Allow all origins for development
  app.enableCors({
    origin: true, // This allows all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  await app.init();
  return app;
}

// For Vercel serverless
let app: any;
export default async (req: any, res: any) => {
  if (!app) {
    app = await bootstrap();
  }
  return app.getHttpAdapter().getInstance()(req, res);
};

// For local development
if (require.main === module) {
  bootstrap().then(app => {
    app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on port ${process.env.PORT ?? 3000}`);
  });
}
