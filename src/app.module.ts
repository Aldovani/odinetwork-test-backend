import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from 'class-validator'
import { DepartmentModule } from './modules/department/department.module'
import { DatabaseModule } from './shared/database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    DatabaseModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
