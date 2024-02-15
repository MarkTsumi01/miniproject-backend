import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/posts.entity';
import { Users } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Users])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
