import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
