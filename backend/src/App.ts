import express, { Express } from "express";
import log from "npmlog";
import { HttpRouter } from './controllers';
import { AppConfig } from './AppConfig';


export class App {
  private server: Express;

  constructor(private config: AppConfig) {
    this.server = express();
    log.level = config.LOG_LEVEL;
  }


  private startApi(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(HttpRouter());
  }

  private async listen(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.server.listen(this.config.SERVER_PORT, () => {
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  getPort(): number | undefined {
    return this.config.SERVER_PORT;
  }


  async start() {
    log.info(this.constructor.name, "starting...");
    await this.startDatabaseConection();
    this.startApi();
    await this.listen();
  }

  async stop() {
    log.info(this.constructor.name, "stopping...");
    process.exit(1)
  }

  private async startDatabaseConection(): Promise<void> {
    try {
      // await database.init(this.config);
      log.info(this.constructor.name, 'Connected to the database');
    } catch (err) {
      log.error(this.constructor.name, 'Failed to connect to the database', err);
      throw err;
    }
  }
}
