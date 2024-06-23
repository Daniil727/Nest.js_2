import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly tasksRepository: Repository<Task>,
	) {}

	create(data: CreateTaskDto) {
		return this.tasksRepository.save(data);
	}

	findAll() {
		return this.tasksRepository.find();
	}

	findOne(id: number) {
		return this.tasksRepository.findOneBy({ id });
	}

	update(id: number, data: UpdateTaskDto) {
		console.log({...data})
		return this.tasksRepository.save({ ...data, id });
	}

	async remove(id: number) {
		await this.tasksRepository.delete({ id });
	}
}
