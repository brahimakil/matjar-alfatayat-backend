import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private storage = admin.storage();

  async uploadFile(file: Express.Multer.File, folder: string = 'uploads'): Promise<string> {
    const bucket = this.storage.bucket();
    const fileName = `${folder}/${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
      public: true,
    });

    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const bucket = this.storage.bucket();
      const fileName = fileUrl.split(`/${bucket.name}/`)[1];
      if (fileName) {
        await bucket.file(fileName).delete();
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}

