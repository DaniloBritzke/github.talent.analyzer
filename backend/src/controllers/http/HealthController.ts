import { Controller, Get, Route } from '@tsoa/runtime';


@Route('/api/v1/health')
export class HealthController extends Controller {
  @Get()
  get() {
    return {
      status: 'ok'
    }
  }
}