import { Injectable } from '@nestjs/common'
import { Employee } from 'src/commons/entities/employee'
import { PrismaService } from '../../prisma.service'
import { EmployeeRepository } from '../employee-repository'
import { PrismaEmployeeMapper } from './mappers/prisma-employee-mapper'

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
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

  async findAll(): Promise<Employee[]> {
    const employees = await this.prismaService.employee.findMany({
      include: { department: true },
    })

    return employees.map(PrismaEmployeeMapper.toDomain)
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
