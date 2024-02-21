import { Comment } from 'src/comments/entity/comments.entity';
import { Post } from 'src/posts/entity/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  walletAddress: string;

  @Column({ length: 30, nullable: true })
  fullname: string;

  @Column({ length: 30, nullable: true })
  username: string;

  @Column({ length: 30, nullable: true })
  role: string;

  @Column({ length: 255, nullable: true })
  img_url: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
