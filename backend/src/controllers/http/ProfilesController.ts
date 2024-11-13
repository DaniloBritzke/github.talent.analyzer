import { Controller, Route, Get, Queries, Tags, Path } from '@tsoa/runtime'
import { profileRepository, repositoryRepository } from '../../infrastructure/container'
import { IProfileListOptions } from '@github.talent.analizer/core'
import { ListProfiles, ListRepositories } from '../../core'

@Route('/api/profile')
@Tags('Profiles')
export class ProfilesController extends Controller {
    @Get('/')
    async listProfiles(@Queries() data: IProfileListOptions) {
        const usecase = new ListProfiles(profileRepository)
        return await usecase.execute(data)
    }

    @Get('/{profileId}/repository')
    async listRepositories(@Path() profileId: string) {
        const usecase = new ListRepositories(repositoryRepository)
        return await usecase.execute({ profileId })
    }
}
