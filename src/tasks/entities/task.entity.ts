import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import {Comment} from 'src/comments/entities/comment.entity'
import { User } from 'src/users/entities/user.entity';
@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text_task: string;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column({type: 'datetime'})
  changet_at: Date
}
