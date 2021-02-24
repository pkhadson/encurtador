import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/createUrl.dto';
import { PayloadRedirectDto } from './dto/payloadRedirect.dto';
import { UrlService } from './url.service';

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiResponse({
    status: 201,
    description: 'Encurtador criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Informe a url',
  })
  @Post('/encurtador')
  async createUrl(@Body() { url, code, expire }: CreateUrlDto) {
    Logger.log(url);
    const { code: newCode } = await this.urlService.create({
      url,
      code,
      expire,
    });

    return { newUrl: `${process.env.URL}/${newCode}` };
  }

  @ApiParam({ name: 'url' })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Redirecionado',
  })
  @ApiResponse({
    status: 404,
    description: 'Url encurtada não existe',
  })
  @Get(':url')
  async redirect(
    @Param() { url: code }: PayloadRedirectDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { url } = await this.urlService.getRedirectUrl(code);
      res.status(HttpStatus.FOUND).redirect(url);
    } catch (err) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }
  }
}
