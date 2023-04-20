import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LinksService, PrismaService],
  controllers: [LinksController]
})
export class LinksModule {}
