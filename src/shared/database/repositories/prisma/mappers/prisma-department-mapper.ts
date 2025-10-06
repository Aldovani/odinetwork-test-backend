import { Prisma, Department as PrismaDepartment } from '@prisma/client'
import { Department } from 'src/commons/entities/department'

export class PrismaDepartmentMapper {
  static toPrisma(department: Department): Prisma.DepartmentCreateInput {
    return {
      name: department.name,
      createdAt: department.createdAt,
      updatedAt: department.updatedAt,
    }
  }

  static toDomain(department: PrismaDepartment): Department {
    return Department.create(
      {
        createdAt: department.createdAt,
        name: department.name,
        updatedAt: department.updatedAt,
      },
      department.id,
    )
  }
}
