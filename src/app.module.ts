import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { LessonNamesModule } from './lesson-names/lesson-names.module';
import { WeekLessonsModule } from './week-lessons/week-lessons.module';
import { DayLessonsModule } from './day-lessons/day-lessons.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { TelegramModule } from './telegram/telegram.module';
import { LinksModule } from './links/links.module';
import * as cors from 'cors';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


@Module({
  imports: [TeacherModule, LessonNamesModule, WeekLessonsModule, DayLessonsModule, ExceptionsModule, TelegramModule, ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }), LinksModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    const corsOptions: CorsOptions = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    };
    consumer.apply(cors(corsOptions)).forRoutes('*');
  }
}
