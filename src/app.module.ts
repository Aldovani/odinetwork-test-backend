import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from 'class-validator'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
