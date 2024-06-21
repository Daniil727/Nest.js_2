import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
export class CreateUserDto {
	@ApiProperty({
		description: 'пароль',
	})
	password: string;
	@ApiProperty({
		description: 'email',
	})
	email: string;
	@ApiProperty({
		description: 'время регистрации',
	})
	changet_at: Date;
	@ApiProperty({
		description: 'имя пользователя',
	})
	lastName: string;
	@ApiProperty({
		description: 'фамилия пользователя',
	})
	firstName: string;
	@ApiProperty({
		description: 'id пользователя',
	})
	id: number;
}

export const CreateUserSchema = Joi.object({
		changet_at: Joi.date().required(),
		password: Joi.string().required().min(6),
		email: Joi.string().email().required(),
		lastName: Joi.string(),
		firstName: Joi.string(),
  });