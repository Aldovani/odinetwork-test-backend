import { Module } from '@nestjs/common'
import { PrismaAssetRepository } from 'src/shared/database/repositories/prisma/prisma-asset-repository'
import { DepartmentService } from '../department/department.service'
import { EmployeeService } from '../employee/employee.service'
import { AssetController } from './asset.controller'
import { AssetService } from './asset.service'

@Module({
  controllers: [AssetController],
  providers: [
    DepartmentService,
    AssetService,
    EmployeeService,
    DepartmentService,
    PrismaAssetRepository,
  ],
})
export class AssetModule {}
