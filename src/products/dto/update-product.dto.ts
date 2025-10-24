import { IsOptional, IsString, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsOptional()
  colors?: Array<{ name: string; value: string }>;

  @IsArray()
  @IsOptional()
  images?: Array<any>;

  @IsString()
  @IsOptional()
  mainImageId?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsOptional()
  dimensions?: {
    length: number | null;
    width: number | null;
    height: number | null;
  };

  @IsOptional()
  weight?: number | null;

  @IsString()
  @IsOptional()
  updatedBy?: string;
}

