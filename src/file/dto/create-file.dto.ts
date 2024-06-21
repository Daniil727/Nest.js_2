import { ApiProperty } from '@nestjs/swagger';



export class CreateFileDto {
  @ApiProperty({
    description: 'имя файла',
  })
  filename: string;

  @ApiProperty({
    description: 'тип файла',
  })
  mimetype: string;

  @ApiProperty({
    description: 'буфер файла',
  })
  data: Buffer;
}


