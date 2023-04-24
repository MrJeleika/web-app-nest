import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { LessonNamesController } from './lesson-names.controller';
import { LessonNamesService } from './lesson-names.service';

@Module({
  controllers: [LessonNamesController],
  providers: [LessonNamesService, PrismaService]
})
export class LessonNamesModule {}
