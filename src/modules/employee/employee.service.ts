import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Employee } from 'src/commons/entities/employee'
import {
  PaginationMetadataProps,
  PaginationProps,
} from 'src/commons/types/pagination'
import { PrismaEmployeeRepository } from 'src/shared/database/repositories/prisma/prisma-employee-repository'
import { DepartmentService } from '../department/department.service'
import { CreateEmployeeDTO } from './dto/create-employee'
import { UpdateEmployeeDTO } from './dto/update-employee'

@Injectable()
export class EmployeeService {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly employeeRepository: PrismaEmployeeRepository,
  ) {}

  async getById(id: number) {
    const employee = await this.employeeRepository.findById(id)
    if (!employee) throw new NotFoundException('Employee not found')
    return employee
  }

  async getAll({
    page,
    perPage,
    search,
  }: PaginationProps & { search: string }): Promise<{
    employees: Employee[]
    metadata: PaginationMetadataProps
  }> {
    const [employees, totalOfEmployees] = await this.employeeRepository.findAll(
      { page, perPage, search },
    )

    const metadata = {
      currentPage: page,
      perPage,
      totalOfPages: Math.round(totalOfEmployees / page),
      totalOfItems: totalOfEmployees,
    }

    return {
      metadata,
      employees,
    }
  }

  async create({
    name,
    departmentId,
    email,
  }: CreateEmployeeDTO): Promise<Employee> {
    const [department] = await Promise.all([
      this.departmentService.getById(departmentId),
      this.isEmailAlreadyExists(email),
    ])

    const rawEmployee = Employee.create({
      departmentId,
      department,
      email,
      name,
    })

    const employee = await this.employeeRepository.create(rawEmployee)

    return employee
  }

  async update(id: number, props: UpdateEmployeeDTO): Promise<Employee> {
    const employeeExist = await this.employeeRepository.findById(id)

    if (!employeeExist) throw new NotFoundException('Employee not found')

    if (employeeExist.departmentId !== props.departmentId) {
      const department = await this.departmentService.getById(
        props.departmentId,
      )

      employeeExist.departmentId = props.departmentId
      employeeExist.department = department
    }

    if (employeeExist.email !== props.email) {
      await this.isEmailAlreadyExists(props.email)

      employeeExist.email = props.email
    }

    employeeExist.name = props.name

    const employee = await this.employeeRepository.save(employeeExist)

    return employee
  }

  async delete(id: number): Promise<void> {
    await this.employeeRepository.delete(id)
  }

  async isEmailAlreadyExists(email: string): Promise<void> {
    const emailAlreadyExists = await this.employeeRepository.findByEmail(email)

    if (emailAlreadyExists)
      throw new BadRequestException('Email already exists')
  }
}
