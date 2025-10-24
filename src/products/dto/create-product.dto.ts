import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  category: string;

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
  @IsNotEmpty()
  createdBy: string;
}

