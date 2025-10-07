import { Module } from '@nestjs/common'
import { PrismaDepartmentRepository } from 'src/shared/database/repositories/prisma/prisma-department-repository'
import { DepartmentController } from './department.controller'
import { DepartmentService } from './department.service'

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaDepartmentRepository],
  exports: [],
})
export class DepartmentModule {}
