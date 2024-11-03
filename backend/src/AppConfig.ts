import Joi from 'joi'
import yaml from 'yaml'
import { readFileSync, existsSync } from 'fs'
import { validate } from './utils/validate'

export interface IAppConfig {
  readonly LOG_LEVEL: 'silly' | 'verbose' | 'info' | 'warn' | 'error';
  readonly SERVER_PORT: number;
  readonly DB_DATABASE_URL: string;
  readonly GITHUB_KEY: string
  readonly LOG_API_ERROR: boolean;
}

export interface AppConfig extends IAppConfig {}
export class AppConfig {
    static readonly schema = Joi.object<AppConfig>({
        LOG_LEVEL: Joi.string()
            .valid('silly', 'verbose', 'info', 'warn', 'error')
            .lowercase()
            .default('info')
            .optional(),
        SERVER_PORT: Joi.number(),
        DB_DATABASE_URL: Joi.string().required(),
        GITHUB_KEY: Joi.string().required(),
        LOG_API_ERROR: Joi.boolean().default(false),
    })

    private static instance?: AppConfig
    static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            throw new Error('App config is not loaded.')
        }
        return AppConfig.instance
    }

    static setInstance(opt: AppConfig) {
        AppConfig.instance = opt
    }

    private constructor(config: IAppConfig) {
        Object.assign(this, config)
    }

    static create(config: IAppConfig): AppConfig {
        const valid = AppConfig.validate(config)
        return new AppConfig(valid)
    }

    static validate(config: Partial<IAppConfig>): IAppConfig {
        return validate(AppConfig.schema, config)
    }

    static loadFromYaml(): AppConfig {
        if (!existsSync('./config.yaml')) {
            throw new Error('File config.yaml not found')
        }
        const file = readFileSync('./config.yaml')
        const data = yaml.parse(file.toString())
        return AppConfig.create({ ...data })
    }
}
