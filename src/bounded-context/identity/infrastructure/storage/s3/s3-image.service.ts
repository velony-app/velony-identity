import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

import { InvalidImageFormatException } from '@identity-infrastructure/storage/s3/exceptions/invalid-image-format.exception';
import { InvalidImageTypeException } from '@identity-infrastructure/storage/s3/exceptions/invalid-image-type.exception';
import { S3Service } from '@identity-infrastructure/storage/s3/s3.service';

export interface ImageUploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

interface FormatConfig {
  mimeType: string;
  extension: string;
}

@Injectable()
export class S3ImageService {
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  private readonly formatConfigs: Record<string, FormatConfig> = {
    webp: { mimeType: 'image/webp', extension: 'webp' },
    jpeg: { mimeType: 'image/jpeg', extension: 'jpg' },
    png: { mimeType: 'image/png', extension: 'png' },
  };

  constructor(private readonly s3Service: S3Service) {}

  async uploadImage(
    key: string,
    buffer: Buffer,
    mimetype: string,
    {
      maxWidth = 1024,
      maxHeight = 1024,
      quality = 85,
      format = 'webp',
      fit = 'cover',
    }: ImageUploadOptions = {},
  ): Promise<string> {
    if (!this.allowedMimeTypes.includes(mimetype)) {
      throw new InvalidImageTypeException(this.allowedMimeTypes);
    }

    // eslint-disable-next-line security/detect-object-injection
    const config = this.formatConfigs[format];
    if (!config) {
      throw new InvalidImageFormatException(format);
    }

    const normalizedBuffer = await this.normalizeImage(
      buffer,
      maxWidth,
      maxHeight,
      quality,
      format,
      fit,
    );

    const keyWithExtension = this.normalizeExtension(key, config.extension);

    return this.s3Service.uploadFile(
      keyWithExtension,
      normalizedBuffer,
      config.mimeType,
    );
  }

  private async normalizeImage(
    buffer: Buffer,
    maxWidth: number,
    maxHeight: number,
    quality: number,
    format: 'webp' | 'jpeg' | 'png',
    fit: ImageUploadOptions['fit'],
  ): Promise<Buffer> {
    const processor = sharp(buffer).resize(maxWidth, maxHeight, {
      fit,
      withoutEnlargement: true,
    });

    switch (format) {
      case 'webp':
        return processor.webp({ quality }).toBuffer();
      case 'jpeg':
        return processor.jpeg({ quality, progressive: true }).toBuffer();
      case 'png':
        return processor.png({ compressionLevel: 9 }).toBuffer();
    }
  }

  private normalizeExtension(key: string, extension: string): string {
    return key.endsWith(`.${extension}`) ? key : `${key}.${extension}`;
  }
}
