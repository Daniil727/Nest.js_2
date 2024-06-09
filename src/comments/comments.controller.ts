import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Comment as commentEntity } from './entities/comment.entity';
@ApiTags('comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@ApiResponse({ status: 201, description: 'успешно', type: commentEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Post()
	create(@Body() createCommentDto: CreateCommentDto): Promise<commentEntity> {
		return this.commentsService.create(createCommentDto);
	}

	@ApiResponse({ status: 201, description: 'успешно', type: commentEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Get()
	findAll(): Promise<commentEntity[]> {
		return this.commentsService.findAll();
	}

	@ApiResponse({ status: 201, description: 'успешно', type: commentEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Get(':id')
	findOne(@Param('id') id: string): Promise<commentEntity | null> {
		return this.commentsService.findOne(+id);
	}

	@ApiResponse({ status: 201, description: 'успешно', type: commentEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCommentDto: UpdateCommentDto,
	): Promise<commentEntity> {
		return this.commentsService.update(+id, updateCommentDto);
	}

	@ApiResponse({ status: 201, description: 'удалено', type: commentEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.commentsService.remove(+id);
	}
}
