import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { trimString } from '../../../common/transformers/trim.transformer';

export class CreateContactDto {
  @Transform(trimString)
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  name!: string;

  @Transform(trimString)
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(180)
  company?: string;

  @Transform(trimString)
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject!: string;

  @Transform(trimString)
  @IsString()
  @MinLength(10)
  @MaxLength(5_000)
  message!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  website?: string;
}
