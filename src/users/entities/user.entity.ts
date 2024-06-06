import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ApiProperty()
  @Column({ type: 'datetime' })
  changet_at: Date;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;
}
