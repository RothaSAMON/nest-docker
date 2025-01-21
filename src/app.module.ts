import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProfileModule } from './auth/profile/profile.module';
import { configDotenv } from 'dotenv';
import { CvModule } from './cv/cv.module';
import { SectionModule } from './section/section.module';
import { TemplateModule } from './template/template.module';
configDotenv();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    CvModule,
    SectionModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {
  constructor() {
    console.log('Database url', process.env.DATABASE_URLD);
  }
}
