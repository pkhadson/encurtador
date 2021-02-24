import { IsString } from 'class-validator';

export class PayloadRedirectDto {
  @IsString()
  url: string;
}
