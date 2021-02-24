import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize/types';
import { CreateUrlDto } from './dto/createUrl.dto';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { DatabaseModule } from '../database/database.module';
import * as request from 'supertest';
import { UrlModule } from './url.module';
import { generate as randomString } from 'randomstring';
import * as moment from 'moment';
import { Url } from './url.entity';

let app: INestApplication;
const url = 'http://wisereducacao.com.br';

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [UrlModule, DatabaseModule],
    providers: [],
  }).compile();

  app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

afterAll(async (done) => {
  await app.close();
  done();
});

describe('success create url', () => {
  it('created simple url - redurn CREATED', (done) => {
    request(app.getHttpServer())
      .post('/encurtador')
      .send({ url })
      .expect(HttpStatus.CREATED)
      .end(async (err, res) => {
        await Url.destroy({
          where: { url },
          force: true,
        });
        done();
      });
  });

  it('created url with custom code - redurn CREATED', (done) => {
    const code = randomString(Math.floor(5 + Math.random() * 6));
    return request(app.getHttpServer())
      .post('/encurtador')
      .send({ url, code })
      .expect(HttpStatus.CREATED)
      .end(async (err, res) => {
        expect(res.body.newUrl).toEqual(`${process.env.URL}/${code}`);
        await Url.destroy({
          where: { code },
          force: true,
        });
        done();
      });
  });
});

describe('errors create url', () => {
  describe('POST /encurtador', () => {
    it('without url - return BAD REQUEST', (done) => {
      return request(app.getHttpServer())
        .post('/encurtador')
        .send({})
        .expect(HttpStatus.BAD_REQUEST, done);
    });
    it('same code - return BAD REQUEST', (done) => {
      const code = randomString(Math.floor(5 + Math.random() * 6));
      return request(app.getHttpServer())
        .post('/encurtador')
        .send({ url, code })
        .expect(HttpStatus.CREATED)
        .end((err, res) => {
          request(app.getHttpServer())
            .post('/encurtador')
            .send({ url, code })
            .expect(HttpStatus.CONFLICT)
            .end(async (err, res) => {
              await Url.destroy({
                where: { code },
                force: true,
              });
              done();
            });
        });
    });
  });
});

describe('test redirect', () => {
  describe('POST /:url', () => {
    let newUrl;
    it('create url', (done) => {
      return request(app.getHttpServer())
        .post('/encurtador')
        .send({ url })
        .expect(HttpStatus.CREATED)
        .end((err, res) => {
          newUrl = res.body.newUrl;
          done();
        });
    });

    it('redirect', (done) => {
      const code = newUrl;
      return request(app.getHttpServer())
        .get('/' + newUrl.split('/').slice(-1).pop())
        .expect('Location', url)
        .expect(HttpStatus.FOUND)
        .end(async (err, res) => {
          await Url.destroy({
            where: { url },
            force: true,
          });
          done();
        });
    });
  });
});
