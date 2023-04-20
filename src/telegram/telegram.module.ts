import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { DayLessonsModule } from 'src/day-lessons/day-lessons.module';
import { DayLessonsService } from 'src/day-lessons/day-lessons.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports: [],
  providers: [TelegramService, DayLessonsService, PrismaService]
})
export class TelegramModule {}
