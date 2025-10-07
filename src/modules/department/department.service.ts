import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Department } from 'src/commons/entities/department'
import {
  PaginationMetadataProps,
  PaginationProps,
} from 'src/commons/types/pagination'
import { PrismaDepartmentRepository } from 'src/shared/database/repositories/prisma/prisma-department-repository'
import { CreateDepartmentDTO } from './dto/create-department'

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: PrismaDepartmentRepository,
  ) {}

  async getDepartmentById(departmentId: number) {
    const department = await this.departmentRepository.findById(departmentId)
    if (!department) throw new NotFoundException('Department not found')
    return department
  }

  async getDepartments({ page, perPage }: PaginationProps): Promise<{
    departments: Department[]
    metadata: PaginationMetadataProps
  }> {
    const [departments, totalOfDepartments] =
      await this.departmentRepository.findAll({
        page,
        perPage,
      })

    const metadata = {
      currentPage: page,
      perPage,
      totalOfPages: Math.round(totalOfDepartments / page),
      totalOfItems: totalOfDepartments,
    }

    return { metadata, departments }
  }

  async create({ name }: CreateDepartmentDTO): Promise<Department> {
    await this.isNameAlreadyExists(name)

    const department = await this.departmentRepository.create({ name })

    return department
  }

  async update(name: string, departmentId: number): Promise<Department> {
    const departmentExist =
      await this.departmentRepository.findById(departmentId)

    if (!departmentExist) throw new NotFoundException('Department not found')

    if (departmentExist.name === name) return departmentExist

    await this.isNameAlreadyExists(name)

    departmentExist.name = name

    await this.departmentRepository.save(departmentExist)

    return departmentExist
  }

  async delete(departmentId: number): Promise<void> {
    await this.departmentRepository.delete(departmentId)
  }

  async isNameAlreadyExists(name: string): Promise<void> {
    const departmentWithSameNameAlreadyExists =
      await this.departmentRepository.findByName(name)

    if (departmentWithSameNameAlreadyExists)
      throw new BadRequestException('department with name already exists')
  }
}
