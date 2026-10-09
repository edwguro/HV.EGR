import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { trimString } from '../../../common/transformers/trim.transformer';

export class AiChatDto {
  @Transform(trimString)
  @IsString()
  @MinLength(2)
  @MaxLength(1_000)
  message!: string;
}
