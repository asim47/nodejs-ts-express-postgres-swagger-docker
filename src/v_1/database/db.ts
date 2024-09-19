import knex, { Knex } from 'knex';
import { types } from 'pg';
import { builtins } from 'pg-types';
import { ENV } from '../helpers/env';
import { Logger } from '../helpers/logger';
import { UserDatabase } from './controllers/user.database';

export class Db {
  // eslint-disable-next-line no-use-before-define
  private static instance: Db;

  private logger: typeof Logger;

  public User: UserDatabase;

  private db: Knex | undefined;

  public constructor() {
    this.logger = Logger;

    const dbArgs = {
      GetKnex: this.GetKnex.bind(this),
      RunQuery: this.RunQuery.bind(this),
    };

    this.User = new UserDatabase(dbArgs);
  }

  public static get Instance(): Db {
    if (!this.instance) {
      this.instance = new Db();
    }

    return this.instance;
  }

  public Init(): void {
    if (!this.db) {
      this.logger.debug('Connecting to database');
      const parseDate = (value: string) => value;
      types.setTypeParser(builtins.DATE as number, parseDate);
      this.db = knex({
        client: 'pg',
        connection: {
          host: ENV.Database.DB_HOST,
          user: ENV.Database.DB_USER,
          database: ENV.Database.DB_NAME,
          password: ENV.Database.DB_PASSWORD,
        },
      });
    }
  }

  public async DisconnectDb(): Promise<void> {
    try {
      if (this.db) {
        this.logger.info('Cleaning up database');
        await this.db.destroy();
      }
    } catch (e) {
      this.logger.error('Failed to cleanup database', e);
    } finally {
      this.db = undefined;
    }
  }

  private GetKnex(): Knex {
    this.Init();
    return this.db as Knex;
  }

  private async RunQuery(
    query: Knex.QueryBuilder,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{ res?: any[]; err: any }> {
    try {
      this.logger.debug(query.toSQL().toNative());
      const res = await query;
      return { res, err: null };
    } catch (e) {
      return { res: undefined, err: e };
    }
  }
}
