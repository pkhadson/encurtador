import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUrlDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  @IsAlphanumeric()
  @IsOptional()
  code?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expire?: string;
}
