import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { DayLessonsController } from './day-lessons.controller';
import { DayLessonsService } from './day-lessons.service';

@Module({
  controllers: [DayLessonsController],
  providers: [DayLessonsService, PrismaService]
})
export class DayLessonsModule {}
