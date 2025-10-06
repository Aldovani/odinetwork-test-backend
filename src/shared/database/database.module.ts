import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { DepartmentRepository } from './repositories/department-repository'
import { PrismaDepartmentRepository } from './repositories/prisma/prisma-department-repository'

@Global()
@Module({
  providers: [
    PrismaService,
    { useClass: PrismaDepartmentRepository, provide: DepartmentRepository },
  ],
  exports: [
    PrismaService,
    { useClass: PrismaDepartmentRepository, provide: DepartmentRepository },
  ],
})
export class DatabaseModule {}
