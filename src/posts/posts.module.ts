import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/posts.entity';
import { Users } from 'src/users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Users])],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
})
export class PostsModule {}
