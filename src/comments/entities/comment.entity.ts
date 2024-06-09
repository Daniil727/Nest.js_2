import { Task } from 'src/tasks/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity('comments')
export class Comment {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	text: string;

	@ManyToOne(() => Task, (task) => task.comments)
	task: Task;

	@ManyToOne(() => User, (user) => user.comments)
	user: User;

	@ApiProperty()
	@Column({ type: 'datetime' })
	changet_at: Date;
}
