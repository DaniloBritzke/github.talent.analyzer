import { PrismaClient as PrismaClientMongo } from './generated/shcemas/mongodb'
import { IProfileRepository, IQueueRepository, IRepositoryRepository, IRequestRepository } from './infrastructure/repository/interfaces'

export interface AppDB {
  profile: IProfileRepository;
  request: IRequestRepository;
  queue: IQueueRepository;
  repositories: IRepositoryRepository;
}

export interface IDBConfig {
  url: string;
}

/**
 * Fix BigInt toJSON issue
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
 */
(BigInt.prototype as any).toJSON = function () {
    return Number(this)
}

class Database {
    private config: IDBConfig
    private _db: PrismaClientMongo

    init(config: IDBConfig) {
        this.config = config
        const type = this.parseUrl()

        this._db = new PrismaClientMongo({
            datasources: {
                db: {
                    url: this.config.url,
                },

            },
        })
    }

    connect() {
        this._db.$connect()
            .then(() => console.log('Connected to MongoDB'))
            .catch((error) => console.error('MongoDB connection failed:', error))
    }

    public get prismaClient() {
        return this._db
    }

    private parseUrl(): string {
        const url = new URL(this.config.url)
        const type = url.protocol.replace('+', '')
        console.table({
            protocol: type,
            database: url.pathname?.replace('/', ''),
            username: url.username,
            password: !!url.password,
            host: url.hostname,
            port: url.port,
        })
        return type
    }
}

export default new Database()
