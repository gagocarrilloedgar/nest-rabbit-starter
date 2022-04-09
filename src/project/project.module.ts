import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { ProjectController } from './project.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'project-service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://boqulmcj:hsT610p3HWC3N_7MRE6i3Mtr_Kfu8hMK@shrimp.rmq.cloudamqp.com/boqulmcj'
          ],
          queue: 'sonarqube-queue'
        }
      }
    ])
  ],
  controllers: [ProjectController]
})
export class ProjectModule {}
