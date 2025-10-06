import { Department } from 'src/commons/entities/department'
import { CreateDepartmentDTO } from '../dto/create-department'

export abstract class IDepartmentService {
  abstract getDepartmentById(departmentId: number): Promise<Department>
  abstract getDepartments(): Promise<Department[]>
  abstract create(department: CreateDepartmentDTO): Promise<Department>
  abstract update(name: string, departmentExist: number): Promise<Department>
  abstract delete(departmentId: number): Promise<void>
}
