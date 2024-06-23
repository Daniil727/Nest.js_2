import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('moderation')
export class ModeratonProcessor {
  @Process('moderate')
  async moderate(job: Job): Promise<any> {
    const start = Date.now();
    console.log('Handling started');

    //что-то тяжелое
    for (let i = 0; i <= 100; i++) {
      console.log(`Completed ${i}%`);
      await job.progress(i);

      for (let j = 0; j <= 100000; j++) {
        for (let k = 0; k <= 5000; k++) {
          j + i;
        }
      }
    }

    console.log(`Handling finished (${Date.now() - start}) ms`);
    return {};
  }
}