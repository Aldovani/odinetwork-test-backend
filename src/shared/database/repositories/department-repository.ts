import { Department } from 'src/commons/entities/department'

type CreateDepartmentProps = { name: string }

export abstract class DepartmentRepository {
  abstract findById(departmentId: number): Promise<Department | null>
  abstract findByName(departmentName: string): Promise<Department | null>
  abstract findAll(): Promise<Department[]>
  abstract create(props: CreateDepartmentProps): Promise<Department>
  abstract save(department: Department): Promise<Department>
  abstract delete(departmentId: number): Promise<void>
}
