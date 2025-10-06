import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { AssetRepository } from './repositories/asset-repository'
import { DepartmentRepository } from './repositories/department-repository'
import { EmployeeRepository } from './repositories/employee-repository'
import { PrismaAssetRepository } from './repositories/prisma/prisma-asset-repository'
import { PrismaDepartmentRepository } from './repositories/prisma/prisma-department-repository'
import { PrismaEmployeeRepository } from './repositories/prisma/prisma-employee-repository'

@Global()
@Module({
  providers: [
    PrismaService,
    { useClass: PrismaDepartmentRepository, provide: DepartmentRepository },
    { useClass: PrismaEmployeeRepository, provide: EmployeeRepository },
    { useClass: PrismaAssetRepository, provide: AssetRepository },
  ],
  exports: [
    PrismaService,
    { useClass: PrismaDepartmentRepository, provide: DepartmentRepository },
    { useClass: PrismaEmployeeRepository, provide: EmployeeRepository },
    { useClass: PrismaAssetRepository, provide: AssetRepository },
  ],
})
export class DatabaseModule {}
