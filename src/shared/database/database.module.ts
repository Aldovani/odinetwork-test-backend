import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { DepartmentRepository } from './repositories/department-repository'
import { EmployeeRepository } from './repositories/employee-repository'
import { PrismaDepartmentRepository } from './repositories/prisma/prisma-department-repository'
import { PrismaEmployeeRepository } from './repositories/prisma/prisma-employee-repository'

@Global()
@Module({
  providers: [
    PrismaService,
    { useClass: PrismaDepartmentRepository, provide: DepartmentRepository },
    { useClass: PrismaEmployeeRepository, provide: EmployeeRepository },
  ],
  exports: [
    PrismaService,
    { useClass: PrismaDepartmentRepository, provide: DepartmentRepository },
    { useClass: PrismaEmployeeRepository, provide: EmployeeRepository },
  ],
})
export class DatabaseModule {}
