import { Controller, Get, Route } from '@tsoa/runtime'

@Route('/api/health')
export class HealthController extends Controller {
  @Get()
    get() {
        return {
            status: 'ok',
        }
    }
}
