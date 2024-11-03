import { Body, Controller, Post, Route } from '@tsoa/runtime'
import { IScheduleProfilesData, ScheduleProfiles } from '../../core'
import { queueRepository, requestRepository } from '../../infrastructure/container'

@Route('/api/schedule')
export class ScheduleController extends Controller {
    @Post('/')
    async create(@Body() data: IScheduleProfilesData) {
        const usecase = new ScheduleProfiles(requestRepository, queueRepository)
        return await usecase.execute(data)
    }
}
