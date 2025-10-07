import { Injectable } from '@nestjs/common'
import { Department } from 'src/commons/entities/department'
import { PaginationProps } from 'src/commons/types/pagination'
import { PrismaService } from '../../prisma.service'
import { PrismaDepartmentMapper } from './mappers/prisma-department-mapper'

@Injectable()
export class PrismaDepartmentRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findById(departmentId: number): Promise<Department | null> {
    const department = await this.prismaService.department.findUnique({
      where: {
        id: departmentId,
      },
    })

    if (!department) return null

    return PrismaDepartmentMapper.toDomain(department)
  }

  async create(props: { name: string }): Promise<Department> {
    const department = await this.prismaService.department.create({
      data: { name: props.name },
    })

    return PrismaDepartmentMapper.toDomain(department)
  }

  async delete(departmentId: number): Promise<void> {
    await this.prismaService.department.delete({
      where: {
        id: departmentId,
      },
    })
  }

  async findAll({
    page,
    perPage,
  }: PaginationProps): Promise<[Department[], number]> {
    const [departments, totalOFDepartments] = await Promise.all([
      this.prismaService.department.findMany({
        skip: perPage * (page - 1),
        take: perPage,
      }),
      this.prismaService.department.count(),
    ])

    return [
      departments.map(PrismaDepartmentMapper.toDomain),
      totalOFDepartments,
    ]
  }

  async findByName(name: string): Promise<Department | null> {
    const department = await this.prismaService.department.findUnique({
      where: {
        name,
      },
    })

    if (!department) return null

    return PrismaDepartmentMapper.toDomain(department)
  }

  async save(department: Department): Promise<Department> {
    const data = await this.prismaService.department.update({
      data: PrismaDepartmentMapper.toPrisma(department),
      where: {
        id: department.id,
      },
    })

    return PrismaDepartmentMapper.toDomain(data)
  }
}
