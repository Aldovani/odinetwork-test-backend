import { Department } from './department'
import { Entity } from './entity'

export type EmployeeProps = {
  name: string
  email: string
  departmentId: number
  department: Department
  createdAt?: Date
  updatedAt?: Date
}

export class Employee extends Entity<EmployeeProps, number> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get departmentId() {
    return this.props.departmentId
  }

  get createdAt() {
    return this.props?.createdAt
  }

  get updatedAt() {
    return this.props?.updatedAt
  }

  get department() {
    return this.props.department
  }

  set name(name: string) {
    this.props.name = name
  }

  set email(email: string) {
    this.props.email = email
  }

  set department(department: Department) {
    this.props.department = department
  }

  set departmentId(departmentId: number) {
    this.props.departmentId = departmentId
  }

  static create(props: EmployeeProps, id?: number) {
    const employee = new Employee(props, id)

    return employee
  }
}
