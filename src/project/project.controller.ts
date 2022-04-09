import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Controller('projects')
export class ProjectController {
  constructor(
    @Inject('project-service') private readonly client: ClientProxy
  ) {}

  @Get()
  getHello() {
    this.client.emit<any>('producer', { data: 'Hello from the client' })
    return 'Hello World!'
  }
}
