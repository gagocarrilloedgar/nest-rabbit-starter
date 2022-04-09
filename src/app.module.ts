import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ProjectModule } from './project/project.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    ProjectModule
  ]
})
export class AppModule {}
