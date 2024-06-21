import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, CreateTasksSchema } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Task as taskEntity } from 'src/tasks/entities/task.entity';
import {ValidationPipe} from 'src/pipes/validatorPipes'
@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@ApiResponse({ status: 201, description: 'успешно', type: taskEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@UsePipes(new ValidationPipe(CreateTasksSchema))
	@Post()
	create(@Body() createTaskDto: CreateTaskDto): Promise<taskEntity> {
		return this.tasksService.create(createTaskDto);
	}

	@ApiResponse({ status: 201, description: 'успешно', type: taskEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@UseGuards(AuthGuard('jwt'))
	@Get()
	findAll(): Promise<taskEntity[]> {
		return this.tasksService.findAll();
	}

	@ApiResponse({ status: 201, description: 'успешно', type: taskEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Get(':id')
	findOne(@Param('id') id: string): Promise<taskEntity | null> {
		return this.tasksService.findOne(+id);
	}

	@ApiResponse({
		status: 201,
		description: 'задача изменена',
		type: taskEntity,
	})
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@UsePipes(new ValidationPipe(CreateTasksSchema))
	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateTaskDto,
	): Promise<taskEntity> {
		return this.tasksService.update(+id, updateTaskDto);
	}

	@ApiResponse({ status: 201, description: 'задача удалена', type: taskEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.tasksService.remove(+id);
	}
}
