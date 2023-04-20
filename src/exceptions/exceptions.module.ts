import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ExceptionsController } from './exceptions.controller';
import { ExceptionsService } from './exceptions.service';

@Module({
  controllers: [ExceptionsController],
  providers: [ExceptionsService, PrismaService]
})
export class ExceptionsModule {}
