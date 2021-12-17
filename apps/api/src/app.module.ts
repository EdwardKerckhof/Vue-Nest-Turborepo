import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { BooksModule } from './books/books.module';

@Module({
  imports: [UsersModule, PostsModule, PrismaModule, BooksModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
