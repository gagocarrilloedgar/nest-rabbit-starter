import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { AppModule } from './app.module'
import { RABBITMQ_URL, NUWE_API_QUEUE } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get(RABBITMQ_URL)],
      queue: configService.get(NUWE_API_QUEUE),
      noAck: false
    }
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // strips the elements that are not in the DTO
    })
  )

  await app.startAllMicroservices()
  await app.listen(process.env.PORT, () => {
    console.log('Microservice is listening on port: ' + process.env.PORT)
  })
}
bootstrap()
