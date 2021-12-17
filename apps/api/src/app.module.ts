import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule, PostsModule, PrismaModule],
  providers: [AppService]
})
export class AppModule {}
