import { Module } from '@nestjs/common'
import { DepartmentService } from '../department/department.service'
import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'
import { DepartmentModule } from '../department/department.module'

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, DepartmentService],
  imports: [DepartmentModule],
})
export class EmployeeModule {}
