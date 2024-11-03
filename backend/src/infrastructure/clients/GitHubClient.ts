import { Octokit } from '@octokit/core'
import {
    IUserRepository,
    IClientGitHubOptions,
    IGetProfileDetailsParams,
    IGetProfileDetailsResponse,
    IRepositoryContributor,
    IRepositoryLanguagesResponse,
    ICommitActivity,
} from '@github.talent.analizer/core'
import { IClientGitHub } from '@/core/client/IGitHubClient'
import log from 'npmlog'

export class GithubClient extends IClientGitHub {
    private client: Octokit
    private timeout: number

    async init(options: IClientGitHubOptions): Promise<void> {
        this.client = new Octokit({
            auth: options.key,
            timeZone: 'America/Sao_Paulo',
        })
        this.timeout = 50000
        const authResponse = await this.client.auth()
        console.log(authResponse)
    }

    private async checkRateLimit(headers: Record<string, any>): Promise<void> {
        const remaining = parseInt(headers['x-ratelimit-remaining'], 10)
        const resetTime = parseInt(headers['x-ratelimit-reset'], 10) * 1000

        if (remaining === 0) {
            const delay = resetTime - Date.now()
            if (delay > 0) {
                console.log(`Rate limit exceeded, pausing for ${delay / 1000} seconds...`)
                await new Promise(resolve => setTimeout(resolve, delay))
            }
        }
    }

    private async requestWithRateLimit(url: string, options = {}) {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.timeout)

        try {
            const { data, headers } = await this.client.request(url, {
                ...options,
                request: { signal: controller.signal },
            })
            await this.checkRateLimit(headers)
            return data
        } catch (error) {
            if (error.name === 'AbortError') {
                log.error(GithubClient.constructor.name, 'Request timed out', error)
            } else {
                log.error(GithubClient.constructor.name, 'Request failed', error)
            }
            throw error
        } finally {
            clearTimeout(timeoutId)
        }
    }

    async getProfileDetails(params: IGetProfileDetailsParams): Promise<IGetProfileDetailsResponse | undefined> {
        const { userName } = params
        const data = await this.requestWithRateLimit(`/users/${userName}`)
        return data ?? undefined
    }

    async getUserRepositories(userName: string): Promise<IUserRepository[]> {
        const data = await this.requestWithRateLimit(`/users/${userName}/repos`)
        return data ?? []
    }

    async getRepositoryContributors(owner: string, repo: string): Promise<IRepositoryContributor[]> {
        const data = await this.requestWithRateLimit(`/repos/${owner}/${repo}/contributors`)
        return data ?? []
    }

    async getRepositoryLanguages(owner: string, repo: string): Promise<IRepositoryLanguagesResponse | undefined> {
        const data = await this.requestWithRateLimit(`/repos/${owner}/${repo}/languages`)
        return data ?? undefined
    }

    async getCommitActivity(owner: string, repo: string): Promise<ICommitActivity[]> {
        const data = await this.requestWithRateLimit(`/repos/${owner}/${repo}/stats/commit_activity`)
        return data ?? []
    }
}
