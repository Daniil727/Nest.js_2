import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @ApiProperty({
    description: 'текст задачи',
  })
  id: number;
  @ApiProperty({
    description: 'текст задачи',
  })
  text_task: string;
}
