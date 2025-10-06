import { Module } from '@nestjs/common'
import { DepartmentModule } from '../department/department.module'
import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'
import { IEmployeeService } from './interface/employee-service.interface'

@Module({
  controllers: [EmployeeController],
  providers: [{ provide: IEmployeeService, useClass: EmployeeService }],
  exports: [{ provide: IEmployeeService, useClass: EmployeeService }],
  imports: [DepartmentModule],
})
export class EmployeeModule {}
