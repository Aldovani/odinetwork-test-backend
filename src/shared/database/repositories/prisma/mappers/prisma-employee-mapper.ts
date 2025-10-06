import { Prisma, Employee as PrismaEmployee } from '@prisma/client'
import { Employee } from 'src/commons/entities/employee'
import { PrismaDepartmentMapper } from './prisma-department-mapper'

type EmployeeWithDepartment = {
  department: {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
  }
} & PrismaEmployee

export class PrismaEmployeeMapper {
  static toPrisma(employee: Employee): Prisma.EmployeeUncheckedCreateInput {
    return {
      name: employee.name,
      createdAt: employee?.createdAt ?? new Date(),
      updatedAt: employee.updatedAt ?? new Date(),
      email: employee.email,
      departmentId: employee.departmentId,
    }
  }

  static toDomain(employee: EmployeeWithDepartment): Employee {
    return Employee.create(
      {
        createdAt: employee.createdAt,
        name: employee.name,
        updatedAt: employee.updatedAt,
        departmentId: employee.departmentId,
        email: employee.email,
        department: PrismaDepartmentMapper.toDomain(employee.department),
      },
      employee.id,
    )
  }
}
