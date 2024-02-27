import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Comment } from 'src/comments/entity/comments.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  body: string;

  @Column({ length: 255, nullable: true })
  imagePath: string;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
