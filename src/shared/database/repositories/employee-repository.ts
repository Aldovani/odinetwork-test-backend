import { Employee } from 'src/commons/entities/employee'

export abstract class EmployeeRepository {
  abstract findById(id: number): Promise<Employee | null>
  abstract findByEmail(email: string): Promise<Employee | null>
  abstract findAll(): Promise<Employee[]>
  abstract create(props: Employee): Promise<Employee>
  abstract save(employee: Employee): Promise<Employee>
  abstract delete(id: number): Promise<void>
}
