import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { url } from 'inspector';
import { CreateUrlDto } from './dto/createUrl.dto';
import { PayloadRedirectDto } from './dto/payloadRedirect.dto';
import { Url } from './url.entity';
import { generate as randomString } from 'randomstring';
import * as moment from 'moment';
import Sequelize from 'sequelize';

@Injectable()
export class UrlService {
  private readonly jwtPrivateKey: string;

  async create(createUrlDto: CreateUrlDto) {
    try {
      const url = new Url();
      url.url = createUrlDto.url;
      url.code =
        createUrlDto.code || randomString(Math.floor(5 + Math.random() * 6));
      if (createUrlDto.expire) url.expire = createUrlDto.expire;
      return await url.save();
    } catch (err) {
      if (err.original && err.original.constraint.startsWith('url_code_key')) {
        throw new HttpException(
          `O código '${err.errors[0].value}' já está sendo usado em outro apontamento`,
          HttpStatus.CONFLICT,
        );
      }

      Logger.error(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getRedirectUrl(code: string) {
    const url = await Url.findOne({
      where: {
        code,
        expire: {
          [Sequelize.Op.gt]: Sequelize.fn('now'),
        },
      },
    });
    if (!url) return;
    url.expire = moment().add(90, 'days').format('YYYY-MM-DD HH:mm:ss');
    await url.save();
    return url;
  }
}
