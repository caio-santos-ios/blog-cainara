import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { LikesModule } from './modules/likes/likes.module';
import { CommentsModule } from './modules/comments/comments.module';
import { IsAdminMiddleware } from './modules/auth/isAdmin.middleware';
import { PostsController } from './modules/posts/posts.controller';
import { PrismaService } from './database/prismaService';
import { AccountsController } from './modules/accounts/accounts.controller';

@Module({
  imports: [AccountsModule, AuthModule, PostsModule, LikesModule, CommentsModule],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAdminMiddleware)
      .exclude(
        { path: 'posts', method: RequestMethod.GET },
        { path: 'posts/:id', method: RequestMethod.GET },
        { path: 'accounts/:id', method: RequestMethod.GET },
        { path: 'accounts/:id', method: RequestMethod.PATCH },
        { path: 'accounts/:id', method: RequestMethod.DELETE },
      )
      .forRoutes(
        PostsController,
        AccountsController
        );
  }
}