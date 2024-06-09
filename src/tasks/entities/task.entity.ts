import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity('tasks')
export class Task {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	text_task: string;

	@OneToMany(() => Comment, (comment) => comment.task)
	comments: Comment[];

	@ManyToOne(() => User, (user) => user.tasks)
	user: User;

	@ApiProperty()
	@Column({ type: 'datetime' })
	changet_at: Date;
}
