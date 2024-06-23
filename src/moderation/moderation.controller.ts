import { Controller, Post, Get, Body } from '@nestjs/common';
import { ModerationService } from './moderation.service';

@Controller('moderation')
export class ModerationController {
  constructor(private readonly service: ModerationService) {}

  @Post()
  async create(@Body() data: any): Promise<{ message: string }> {
    this.service.moderate(parseInt(data.post_id));
    return {
      message: 'Added to the queue!',
    };
  }

  @Get()
  findAll(): any {
    return this.service.getJobs();
  }
}