import express from 'express';
import cors from 'cors';
import { config as dotConfig } from 'dotenv';
import { Env } from './config/env';
import { RedisSetup } from './utils/redisSetup';

dotConfig();

new RedisSetup().promisifyCommands();

export class Server {
  private app = express();
  private port = Env.all().port;

  public start() {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.listen(this.port,() => {
      console.log(`Server is listening on port: ${this.port}`);
    })
  }
}

// Start Server
new Server().start();
