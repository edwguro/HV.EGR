import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ListProjectsQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  technology?: string;
}
