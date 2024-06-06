import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  create(data: CreateCommentDto) {
    return this.commentsRepository.save(data);
  }

  findAll() {
    return this.commentsRepository.find();
  }

  findOne(id: number) {
    return this.commentsRepository.findOneBy({ id });
  }

  update(id: number, data: CreateCommentDto) {
    return this.commentsRepository.save({ ...data, id });
  }

  async remove(id: number) {
    await this.commentsRepository.delete({ id });
  }
}
