import { PrismaService } from 'src/prisma/prisma.service';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, PrismaService]
})
export class TeacherModule {}
