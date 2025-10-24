import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWhatsAppDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  updatedBy: string;
}

