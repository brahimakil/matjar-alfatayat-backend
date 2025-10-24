import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';
import { SettingsModule } from './settings/settings.module';
import { AdminsModule } from './admins/admins.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CategoriesModule,
    ProductsModule,
    UploadModule,
    SettingsModule,
    AdminsModule,
    DashboardModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
