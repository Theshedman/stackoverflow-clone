// Update with your config settings.
import { Env } from './src/config/env';

const env = Env.all();

const connectionFields = {
  client: 'pg',
  connection: {
    host: env.pg_host,
    user: env.pg_user,
    password: env.pg_password,
    database: env.pg_dbname,
    port: env.pg_port,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations',
    tableName: 'stackoverflow_service_migrations',
    extension: 'ts'
  },
  seeds: {
    directory: './seeds'
  }
};

module.exports = {
  development: connectionFields,

  staging: connectionFields,

  production: connectionFields,

  test: connectionFields
};
