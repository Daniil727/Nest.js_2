import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Task } from 'src/tasks/entities/task.entity';
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column({type: 'datetime'})
  changet_at: Date;

  @Column()
  email: string;
  
  @Column()
  password: string;
}
