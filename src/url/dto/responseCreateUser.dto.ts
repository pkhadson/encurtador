import { IsString } from 'class-validator';

export class ResponseCreateUrlDto {
  @IsString()
  newUrl: string;
}
