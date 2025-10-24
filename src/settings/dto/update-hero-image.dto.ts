import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateHeroImageDto {
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  headerText?: string;

  @IsString()
  @IsOptional()
  headerColor?: string;

  @IsString()
  @IsOptional()
  descriptionText?: string;

  @IsString()
  @IsOptional()
  descriptionColor?: string;

  @IsString()
  @IsOptional()
  textBackgroundColor?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

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
  @IsOptional()
  updatedBy?: string;
}

