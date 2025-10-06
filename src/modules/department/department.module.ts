import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/shared/database/database.module'
import { DepartmentController } from './department.controller'
import { DepartmentService } from './department.service'

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [DatabaseModule],
})
export class DepartmentModule {}
