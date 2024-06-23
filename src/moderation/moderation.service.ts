import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ModerationService {
  constructor(@InjectQueue('moderation') private moderationQueue: Queue) {}

  async moderate(tasks_id: number):Promise<void> {
    this.moderationQueue.add('moderate', {
      tasks_id,
    });
  }

  async getJobs(): Promise<any> {
    return await this.moderationQueue.getJobs(['active', 'completed']);
  }
}