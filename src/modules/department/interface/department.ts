import { Department } from 'src/commons/entities/department'
import { CreateDepartmentDTO } from '../dto/create-department'

export interface IDepartmentService {
  getDepartmentById(departmentId: number): Promise<Department>
  getDepartments(): Promise<Department[]>
  create(department: CreateDepartmentDTO): Promise<Department>
  update(name: string, departmentExist: number): Promise<Department>
  delete(departmentId: number): Promise<void>
}
