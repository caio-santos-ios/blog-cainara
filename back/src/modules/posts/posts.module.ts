import { BadRequestException, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fail } from 'assert';
import { PrismaService } from 'src/database/prismaService';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './tmp',
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('Formato da foto não aceito'),
            false,
          );
        }
      },
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
