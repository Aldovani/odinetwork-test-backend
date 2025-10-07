import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from 'class-validator'
import { DepartmentModule } from './modules/department/department.module'
import { DatabaseModule } from './shared/database/database.module'
import { EmployeeModule } from './modules/employee/employee.module'
import { AssetModule } from './modules/asset/asset.module'
import { MaintenanceModule } from './modules/maintenance/maintenance.module'

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
    MaintenanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
