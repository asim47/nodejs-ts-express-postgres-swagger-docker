import express from 'express';
import { Logger } from './src/v_1/helpers/logger';
import { Swagger } from './src/v_1/helpers/env';
import helmet from 'helmet';
import xss from 'xss-clean';
import SwaggerUI from 'swagger-ui-express';
import SwaggerDocs from './swagger.json';
import { ApiController } from './src/v_1/internal-api/controller';
import { Db } from './src/v_1/database/db';
import { SeedsController } from './src/v_1/seeds/seeds.controller';
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.seedMiddlewares();
    this.routes();
  }
  public app: express.Application;

  private middlewares(): void {
    Logger.info('Middlewares are being initialized...');

    this.app.use(xss());
    this.app.use(helmet());

    this.app.use(Swagger.PATH + '/v_1', SwaggerUI.serve, SwaggerUI.setup(SwaggerDocs));

    this.app.use((req, res, next) => {
      const db = new Db();
      res.locals.db = db;
      res.on('finish', async () => {
        Logger.info('Request processing finished');
        if (db) {
          Logger.debug('Data connection closed');
          await db.DisconnectDb();
        }
      });
      next();
    });
    Logger.info('Middlewares are initialized successfully...');
  }

  private async seedMiddlewares(): Promise<void> {
    Logger.info('Seed Middlewares are being initialized...');
    const Seeds = new SeedsController();
    await Seeds.initSeeds();
    Logger.info('Middlewares are initialized successfully...');
  }

  private routes(): void {
    Logger.info('Routes are being initialized...');

    this.app.use(`/api/v_1/internal`, new ApiController().router);

    this.app.use(`*`, (req, res) => {
      res.status(404).json({ message: 'Route not Found' });
    });

    Logger.info('Routes initialized successfully...');
  }
}
export default new App().app;
