import { Employee } from 'src/commons/entities/employee'
import { CreateEmployeeDTO } from '../dto/create-employee'
import { UpdateEmployeeDTO } from '../dto/update-employee'

export abstract class IEmployeeService {
  abstract getById(id: number): Promise<Employee>
  abstract getAll(): Promise<Employee[]>
  abstract create(employee: CreateEmployeeDTO): Promise<Employee>
  abstract update(id: number, props: UpdateEmployeeDTO): Promise<Employee>
  abstract delete(id: number): Promise<void>
}
