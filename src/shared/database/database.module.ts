import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAssetRepository } from './repositories/prisma/prisma-asset-repository'
import { PrismaDepartmentRepository } from './repositories/prisma/prisma-department-repository'
import { PrismaEmployeeRepository } from './repositories/prisma/prisma-employee-repository'
import { PrismaMaintenanceRepository } from './repositories/prisma/prisma-maintenance-repository'

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaDepartmentRepository,
    PrismaEmployeeRepository,
    PrismaAssetRepository,
    PrismaMaintenanceRepository,
  ],
  exports: [
    PrismaService,
    PrismaDepartmentRepository,
    PrismaEmployeeRepository,
    PrismaAssetRepository,
    PrismaMaintenanceRepository,
  ],
})
export class DatabaseModule {}
