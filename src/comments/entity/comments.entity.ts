import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Post } from 'src/posts/entity/posts.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  commentText: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;
}
