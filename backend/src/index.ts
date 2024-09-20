import { AppConfig } from './AppConfig'
import { App } from './App'

async function main() {
    const config = AppConfig.loadFromYaml()
    AppConfig.setInstance(config)
    const app = new App(config)

    const onClose = async () => {
        console.log('Shutting down application gracefully...')
        await app.stop()
        console.log('Bye!')
    }

    process.on('SIGTERM', onClose).on('SIGTERM', onClose)

    await app.start()
    console.log(`Application started, listening on ${app.getPort()}`)
    console.log(`Swagger at http://127.0.0.1:${app.getPort()}`)
}

main().catch((e) => {
    console.log('Failed starting app', e)
    process.exit(1)
})
