import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
export class CreateTaskDto {
	@ApiProperty({
		description: 'текст задачи',
	})
	id: number;
	@ApiProperty({
		description: 'текст задачи',
	})
	text_task: string;
	@ApiProperty({
		description: 'время задачи',
	})
	changet_at: Date;
	
}

export const CreateTasksSchema = Joi.object({
	// id: Joi.number().required(),
	text_task: Joi.string().required(),
	changet_at: Joi.date().required(),
});