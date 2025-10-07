import { Module } from '@nestjs/common'
import { AssetService } from '../asset/asset.service'
import { DepartmentService } from '../department/department.service'
import { EmployeeService } from '../employee/employee.service'
import { MaintenanceController } from './maintenance.controller'
import { MaintenanceService } from './maintenance.service'

@Module({
  controllers: [MaintenanceController],
  providers: [
    MaintenanceService,
    AssetService,
    EmployeeService,
    DepartmentService,
  ],
})
export class MaintenanceModule {}
