import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { WeekLessonsController } from './week-lessons.controller';
import { WeekLessonsService } from './week-lessons.service';

@Module({
  controllers: [WeekLessonsController],
  providers: [WeekLessonsService, PrismaService]
})
export class WeekLessonsModule {}

