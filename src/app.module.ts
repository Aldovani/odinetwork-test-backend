import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from 'class-validator'
import { AssetModule } from './modules/asset/asset.module'
import { DepartmentModule } from './modules/department/department.module'
import { EmployeeModule } from './modules/employee/employee.module'
import { DatabaseModule } from './shared/database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    DatabaseModule,
    DepartmentModule,
    EmployeeModule,
    AssetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
