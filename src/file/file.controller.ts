import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File as fileEntity } from './entities/file.entity';


@ApiTags('Files')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiResponse({
    status: 201,
    description: 'Файл успешно сохранен',
    type: fileEntity,
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<fileEntity> {
    console.log(file);
    const createFileDto = {
      filename: file.originalname,
      mimetype: file.mimetype,
      data: file.buffer,
    };

    return this.fileService.saveFile(createFileDto);
  }
}
