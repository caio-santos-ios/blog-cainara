import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PrismaService } from 'src/database/prismaService';

@Module({
  controllers: [LikesController],
  providers: [LikesService, PrismaService],
})
export class LikesModule {}
