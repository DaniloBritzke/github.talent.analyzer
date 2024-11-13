import { Body, Controller, Post, Route } from '@tsoa/runtime'
import { ScheduleProfiles } from '../../core'
import { queueRepository, requestRepository } from '../../infrastructure/container'
import { IScheduleProfilesData } from '@github.talent.analizer/core'

@Route('/api/schedule')
export class ScheduleController extends Controller {
    @Post('/')
    async create(@Body() data: IScheduleProfilesData) {
        const usecase = new ScheduleProfiles(requestRepository, queueRepository)
        return await usecase.execute(data)
    }
}
