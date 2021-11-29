import { Express } from 'express';
import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (req: any, file: Express.Multer.File, callback) => {
  if (!file) {
    return callback(new BadRequestException('file required'), false);
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};
