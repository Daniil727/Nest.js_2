import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentsRepository: Repository<Comment>,
	) {}

	create(data: CreateCommentDto): Promise<Comment> {
		return this.commentsRepository.save(data);
	}

	findAll(): Promise<Comment[]> {
		return this.commentsRepository.find();
	}

	findOne(id: number): Promise<Comment | null> {
		return this.commentsRepository.findOneBy({ id });
	}

	update(id: number, data: CreateCommentDto): Promise<Comment> {
		return this.commentsRepository.save({ ...data, id });
	}

	async remove(id: number): Promise<void> {
		await this.commentsRepository.delete({ id });
	}
}
