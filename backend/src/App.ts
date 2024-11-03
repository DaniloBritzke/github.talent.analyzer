import express, { Express } from 'express'
import log from 'npmlog'
import { HttpRouter } from './controllers'
import { AppConfig } from './AppConfig'
import database from './db'
import { onStartup } from './infrastructure/container'

export class App {
    private server: Express

    constructor(private config: AppConfig) {
        this.server = express()
        log.level = config.LOG_LEVEL
    }

    private startApi(): void {
        this.server.use(express.json())
        this.server.use(express.urlencoded({ extended: false }))
        this.server.use(HttpRouter())
    }

    private async listen(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                this.server.listen(this.config.SERVER_PORT, () => {
                    resolve()
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    getPort(): number | undefined {
        return this.config.SERVER_PORT
    }

    async start() {
        log.info(this.constructor.name, 'starting...')
        await this.startDatabaseConection()
        this.startApi()
        await this.listen()
        await this.startInfrastructure()
    }

    async stop() {
        log.info(this.constructor.name, 'stopping...')
        process.exit(1)
    }

    private async startDatabaseConection(): Promise<void> {
        try {
            database.init({ url: this.config.DB_DATABASE_URL })
            database.connect()
            log.info(this.constructor.name, 'Connected to the database')
        } catch (err) {
            log.error(this.constructor.name, 'Failed to connect to the database', err)
            throw err
        }
    }

    private async startInfrastructure(): Promise<void> {
        try {
            await onStartup()
            log.info(this.constructor.name, 'Started infrastructure services')
        } catch (err) {
            log.error(this.constructor.name, 'Failed start infrastructure services', err)
            throw err
        }
    }
}
