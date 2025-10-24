import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const url = await this.uploadService.uploadFile(file, 'images');
    return {
      url,
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
    };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const uploadPromises = files.map(file => 
      this.uploadService.uploadFile(file, 'images')
    );
    
    const urls = await Promise.all(uploadPromises);

    return files.map((file, index) => ({
      url: urls[index],
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
    }));
  }
}

