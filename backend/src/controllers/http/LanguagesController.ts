import { Controller, Route, Get, Tags, Queries } from '@tsoa/runtime'
import { repositoryRepository } from '../../infrastructure/container'
import { IListLanguagesOptions } from '@github.talent.analizer/core'
import { ListLanguages } from '@/core'

@Route('/api/language')
@Tags('Languages')
export class LanguagesController extends Controller {
    @Get('/')
    async listLanguages(@Queries() data: IListLanguagesOptions) {
        const usecase = new ListLanguages(repositoryRepository)
        return await usecase.execute(data)
    }
}
