import { Injectable } from '@nestjs/common'
import { Employee } from 'src/commons/entities/employee'
import { PaginationProps } from 'src/commons/types/pagination'
import { PrismaService } from '../../prisma.service'
import { PrismaEmployeeMapper } from './mappers/prisma-employee-mapper'

@Injectable()
export class PrismaEmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<Employee | null> {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        id,
      },
      include: {
        department: true,
      },
    })

    if (!employee) return null

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async create(employee: Employee): Promise<Employee> {
    const department = await this.prismaService.employee.create({
      data: PrismaEmployeeMapper.toPrisma(employee),
      include: {
        department: true,
      },
    })

    return PrismaEmployeeMapper.toDomain(department)
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.employee.delete({
      where: {
        id,
      },
    })
  }

  async findAll({
    page,
    perPage,
    search,
  }: PaginationProps & { search: string }): Promise<[Employee[], number]> {
    const [employees, totalOfEmployees] = await Promise.all([
      this.prismaService.employee.findMany({
        include: { department: true },
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          name: {
            mode: 'insensitive',
            contains: search,
          },
        },
      }),
      this.prismaService.employee.count({
        where: {
          name: {
            mode: 'insensitive',
            contains: search,
          },
        },
      }),
    ])

    return [employees.map(PrismaEmployeeMapper.toDomain), totalOfEmployees]
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        email,
      },
      include: {
        department: true,
      },
    })

    if (!employee) return null

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async save(employee: Employee): Promise<Employee> {
    const data = await this.prismaService.employee.update({
      data: PrismaEmployeeMapper.toPrisma(employee),
      where: {
        id: employee.id,
      },
      include: {
        department: true,
      },
    })

    return PrismaEmployeeMapper.toDomain(data)
  }
}
