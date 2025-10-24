import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateHeroImageDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  headerText: string;

  @IsString()
  @IsNotEmpty()
  headerColor: string;

  @IsString()
  @IsNotEmpty()
  descriptionText: string;

  @IsString()
  @IsNotEmpty()
  descriptionColor: string;

  @IsString()
  @IsNotEmpty()
  textBackgroundColor: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  overlayEnabled?: boolean;

  @IsNumber()
  @IsOptional()
  overlayOpacity?: number;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

