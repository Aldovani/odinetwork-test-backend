import { Module } from '@nestjs/common'
import { DepartmentController } from './department.controller'
import { DepartmentService } from './department.service'
import { IDepartmentService } from './interface/department'

@Module({
  controllers: [DepartmentController],
  providers: [{ useClass: DepartmentService, provide: IDepartmentService }],
  exports: [{ useClass: DepartmentService, provide: IDepartmentService }],
})
export class DepartmentModule {}
